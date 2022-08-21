---
slug: "/review/refactoring-1"
date: "2022-08-18"
title: "API 호출 함수 대수술"
tags: ["리펙토링", "관심사 분리", "etc"]
---

대수술이었다. 약 10시간 정도 걸렸다. 이 일을 한 발단은 원티드 프리 온보딩 코스를 들으면서 관심사의 분리를 듣고 시작했다. [할 일 목록 생성 어플](https://github.com/movie42/wanted-pre-onboarding-challenge-fe-1-api)을 만들다가 내 프로젝트에 일괄적으로 적용해봐도 괜찮겠다 싶었다. 나의 코드를 열어서 다시 보는 순간 분명 약 1개월 정도밖에 되지 않은 코드인데 썩은 내가 나는 것 같았다. 무슨 의도로 이렇게 난해하게 작성을 했는지 모르겠다. 아마 그때 당시에는 ‘동작’하니까 이렇게 작성했을 것 같다. 만약에 이게 회사였다면 PR 승인도 못받았을 것 같은 느낌적인 느낌. 이번 리펙토링의 큰 줄기는 관심사의 분리다. 그리고 세부적으로 API를 호출하는 함수와 뷰를 최대한 분리하였다. 마침 몇개월 전에 스프린트를 끝내면서 [이슈](https://github.com/movie42/ychung-frontend/issues/26)를 하나 남겨놓았었다. 그때도 이 부분이 고민이긴 했나보다.

## 불분명한 이름 변경하기

아래 코드는 서버에 Get 요청을 위해서 만들어진 코드다. 제네릭 타입을 지정할 때, T라고 그냥 아무 생각 없이 지정했었다. 이런 불분명한 이름은 나중에 다른 사람이 나의 코드를 사용해서 기능을 추가하거나 유지 보수 해야 할 때, 정말 화가날 것 같은 부분이었다. 설명도 없는데 그냥 T라니… 아마 useGet 함수를 사용하기 위해 마우스를 올려다 놓으면 그냥 T라고만 되어있어서 사용하기 어렵다.

- **before**

```tsx
interface IFetchProps<T>
  extends Omit<
    UseQueryOptions<T, unknown, T, QueryKey>,
    "queryKey" | "queryFn"
  > {
  url: RequestInfo;
  queryKey: string | string[];
}

const useGet = <T,>({ url, queryKey, ...rest }: IFetchProps<T>) => {
  return useQuery<T>(
    queryKey,
    async () => {
      const response = await fetch(url, getRequest);
      const { data } = await response.json();
      return data;
    },
    {
      ...rest,
    }
  );
};
```

그래서 API를 호출하는 훅을 만들 때, 최대한 불분명한 이름을 짓지 않으려고 노력했다. 그 결과가 아래 코드다. 일단 useGetEducation이라는 이름을 보고 대강 교육에 관련된 것을 가져오는 훅이라는 것을 짐작할 수 있다. useQuery에 들어간 제네릭 타입도 EducationGetData라고 이름을 지었다. EducationGet의 Data의 모형을 나타내겠구나라고 짐작할 수 있다. 위의 코드보다 아래 코드가 훨씬 더 명확하다. 목적에 맞는 이름을 잘 짓는 것이 중요한 것 같다.

- **after**

```tsx
import { API } from "@/lib/api";
import { useQuery } from "react-query";
import { EducationGetData } from "./interface";

const useGetEducations = () => {
  const api = new API();
  return useQuery<EducationGetData[]>(
    ["educations"],
    () => api.getData<EducationGetData[]>("/api/education/groups"),
    { onSuccess: () => {} }
  );
};

export default useGetEducations;
```

## 하나의 함수, 하나의 일

### useDelete는 삭제만 하게 해주세요.

나의 코드의 함수는 여러 일을 하느라 힘들다. 아니 함수는 힘들어보이지 않는데 그걸 보는 내가 힘들다. 대표적인 함수 useDelete를 살펴보고 개선 한 사례를 살펴보자.

```tsx
import React, { useEffect, useState } from "react";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { deleteRequest } from "@/lib/utils";
import useGetCSRFToken from "./useGetCSRFToken";

interface IuseDeleteProps<T>
  extends Omit<UseMutationOptions<T, unknown, void, unknown>, "mutationFn"> {
  url: RequestInfo;
  queryKey: string;
}

const useDelete = <T,>({ url, queryKey, ...rest }: IuseDeleteProps<T>) => {
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { csrf, csrfToken } = useGetCSRFToken();

  const deleteHelper = async () => {
    const response = await fetch(url, deleteRequest(csrfToken));
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  const mutation = useMutation<T>(deleteHelper, { ...rest });

  return {
    isConfirmModal,
    setIsConfirmModal,
    isDelete,
    setIsDelete,
    ...mutation,
  };
};

export default useDelete;
```

이 훅은 delete 요청을 보내 DB에서 무언가를 삭제하기 위해 만든 훅이다. 그런데 보면 용도를 모르겠는 것이 있다.

```tsx
const [isConfirmModal, setIsConfirmModal] = useState(false);
const [isDelete, setIsDelete] = useState(false);
```

이 코드는 모달을 컨트롤 하기 위해 만든 상태다. 아마 설명이 없다면 이 훅을 보고 당장 사용해야겠다고 생각이 들지 않을 것이다. 누군가 이 코드를 사용해야한다면 내부를 보지 않고는 delete가 일어나는 과정을 유추할 수 가 없다.(열어봐도 유추하기 어렵다.)

나는 이 코드를 하나는 모달을 컨트롤하기 위한 함수, 하나는 서버에 delete 요청을 보내는 함수로 쪼개기로 했다.

- useDeleteNotice : 서버에 공지사항 삭제 요청을 보내는 함수.

```tsx
import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";

interface NoticeDeleteVariable {
  id: string;
}

interface NoticeDeleteData {
  data: string;
}

const useDeleteNotice = () => {
  const api = new API();
  const queryClient = useQueryClient();

  return useMutation<NoticeDeleteData, Error, NoticeDeleteVariable>(
    ({ id }) => api.deleteData(`/api/notice/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notices"]);
      },
    }
  );
};

export default useDeleteNotice;
```

- useModalControl : 클라이언트에서 모달을 열고 닫고, 모달의 확인, 취소 버튼을 컨트롤 할 수 있다.

```tsx
import { useState } from "react";

const useModalContorl = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isModal, setIsModal] = useState(false);

  return { isConfirm, setIsConfirm, isModal, setIsModal };
};

export default useModalContorl;
```

함수를 쪼개면서 여러가지가 변경되었다. 특히 이름이 변경되면서 함수가 어떤 일을 하는지 더 명확해졌다. 이전에는 isDelete, isConfirmModal과 같은 이름을 보면 어떻게 써야하는지 조금 햇갈렸다. 하지만 isModal, isConfirm으로 변경해서 모든 모달에서 두루두루 사용할 수 있을 것 같다.

### post와 patch 나누기

usePostOrPatch라는 훅을 만들 때, 정말 근사한 아이디어라고 생각했다. method를 prop으로 받아서 함수 안에서 역할을 나눠주는 것이다. 하지만 나중에 가서 usePostOrPatch라고 이름이 붙어있는 것을 보면 곧바로 어떤 일을 하는지 알 수 없다. props를 살펴봐야지만 ‘지금 post를 하고 있구나, patch를 하고 있구나'라고 유추할 수 있다.

```tsx
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postOrPatchRequest } from "../utilities/httpMethod";
import useGetCSRFToken from "./useGetCSRFToken";

interface IusePostProps {
  url: RequestInfo;
  queryKey: string | string[];
  method: "POST" | "PATCH";
}

const usePostOrPatch = <TData, TError, TVariables>({
  url,
  queryKey,
  method,
}: IusePostProps) => {
  const { csrf, csrfToken } = useGetCSRFToken();
  const queryClient = useQueryClient();

  const postHelper = async (postData: TVariables) => {
    const response = await fetch(
      url,
      postOrPatchRequest(postData, csrfToken, method)
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };

  useEffect(() => {
    csrf();
  }, []);

  return useMutation<TData, TError, TVariables, unknown>(postHelper, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default usePostOrPatch;
```

하지만 이번 리펙토링에서는 전부 분리하기로 했다. 그냥 하나의 함수에 너무 많은 아이디어를 넣어서 사용 방법을 복잡하게 하는 것보다 쉽게 사용할 수 있게 변경하는 편이 낫다고 생각했기 때문이다. 함수 내부가 비슷하기 때문에 반복 되는 것 같은 느낌이 든다. 하지만 페이지 컴포넌트 안에서 사용될 때, 정말 복잡하다.

- usePatchGroupInfo

```tsx
import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import {
  EducationGroupInfoData,
  EducationGroupInfoVariable,
} from "./interface";

const usePatchGroupInfo = () => {
  const api = new API();
  const queryClient = useQueryClient();
  return useMutation<EducationGroupInfoData, Error, EducationGroupInfoVariable>(
    ({ id, body }) => api.patchData(`/api/education/groups/${id}`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groupInfo"]);
      },
    }
  );
};

export default usePatchGroupInfo;
```

- useCreateGroup

```tsx
import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "react-query";
import { EducatioCreateGroupVariable, EducationGroupData } from "./interface";

const useCreateGroup = () => {
  const api = new API();
  const queryClient = useQueryClient();
  return useMutation<EducationGroupData, Error, EducatioCreateGroupVariable>(
    ({ id, body }) => api.postData(`/api/education/groups/${id}/group`, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["groupInfo"]);
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["people"]);
      },
    }
  );
};

export default useCreateGroup;
```

## 꼭 분리가 답은 아니다.

분리 해서 편한것도 있지만 같은 역할을 하는 것끼리 통합하는 것도 때론 문제 해결의 방법이 된다. 아래 코드는 fetch option을 생성해서 넣어주는 객체 또는 함수다. 이런 분리가 더 좋지 않았다. fetch를 사용할 때, option을 반복해서 넣어 주어야했다. 그래서 그냥 이 기능을 하나로 합쳐버렸다.

```tsx
export const getRequest: RequestInit = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
  credentials: "include",
  mode: "cors",
};

export const getWeekliesData = async () => {
  const response = await fetch(`/api/worship`, getRequest);
  const { data } = await response.json();
  return data;
};

export const postOrPatchRequest = (
  body: any,
  csrfToken: string,
  method: "POST" | "PATCH"
): RequestInit => {
  const data = JSON.stringify({ ...body });
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: data,
    credentials: "include",
    mode: "cors",
  };
};

export const postRequestMultipartFormData = (
  body: any,
  csrfToken: string
): RequestInit => {
  return {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body,
    credentials: "include",
    mode: "cors",
  };
};

export const deleteRequest = (csrfToken: string): RequestInit => ({
  method: "DELETE",
  headers: {
    "Content-type": "application/json",
    "X-CSRF-Token": csrfToken,
  },
  credentials: "include",
  mode: "cors",
});
```

API라는 class를 만들어서 get, post, patch, put, delete를 기능별로 만들었다. 그래서 오히려 생성자를 선언하고 method 별로 함수를 불러와 바로 사용할 수 있게 했다. 변경 후에 커스텀 훅 내부가 훨씬 더 알아보기 쉬워졌다. hook의 이름으로 기능을 유추할 수 있지만, 내부를 열었을 때도 변경도 쉽다.

```tsx
class API {
  async getData<TData>(url: string) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async postData<TData, TVariable>(url: string, body: TVariable) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async patchData<TData, TVariable>(url: string, body: TVariable) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async putData<TData, TVariable>(url: string, body: TVariable) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }

  async deleteData<TData>(url: string) {
    const CSRFToken = await this.getData<string>("/api/csrf-token");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRF-Token": CSRFToken,
      },
      credentials: "include",
      mode: "cors",
    });

    const { data } = await response.json();

    return data as TData;
  }
}

export default API;
```

```tsx
// 다른것을 다 생략하고 보더라도 통합된 함수를 사용하는 것이 훨씬 더 효율적이다.

// 분리
const useDelete = <T,>({ url, queryKey, ...rest }: IuseDeleteProps<T>) => {
  const deleteHelper = async () => {
    const response = await fetch(url, deleteRequest(csrfToken));
    return response.json();
  };

  const mutation = useMutation<T>(deleteHelper, { ...rest });
};

// 통합
const useDeleteGroup = () => {
  const api = new API();
  return useMutation((id: string) =>
    api.deleteData(`/api/education/group/${id}`)
  );
};
```

## 최악의 코드

그래서 이번 리펙토링을 통해서 뷰와 비동기 코드를 분리해서 조금은 개선할 수 있었다. 하지만 여전히 부족한 부분이 많이 보인다. 대표적으로 가장 최악이라고 뽑은 코드를 개선 예제로 넣었다. 전체 코드를 보면 정말 토나온다.

- before
  <details>
  <summary>before 전체 코드</summary>

  ```tsx
  import React, { useEffect, useRef, useState } from "react";
  import styled from "styled-components";
  import Human from "./Human/Human";
  import { Droppable } from "react-beautiful-dnd";
  import { useForm } from "react-hook-form";
  import { useQueryClient } from "react-query";
  import {
    MdArrowDropDown,
    MdDelete,
    MdEdit,
    MdPersonAdd,
  } from "react-icons/md";
  import { ConfirmDeleteModal } from "@/components";

  import {
    People,
    Group as GroupProps,
  } from "../../../state/educationGroup.atom";

  import { usePost } from "@/lib/hooks";
  import { useGet } from "@/lib/hooks";
  import { FetchDataProps } from "@/lib/interfaces";

  import { translateEducationTypeNameToKR } from "@/lib/utils";
  import { useDebouncedEffect, useDelete } from "@/lib/hooks";
  import { useRecoilState } from "recoil";
  import { AiOutlineConsoleSql } from "react-icons/ai";

  const Container = styled.div`
    border: 1px solid ${props => props.theme.color.gray300};
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  `;

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .group-info {
      display: flex;
      span {
        margin-left: 0.5rem;
      }
    }
  `;

  const ButtonContainer = styled.div`
    button {
      cursor: pointer;
      background-color: unset;
      border: 0;
      font-size: 2.5rem;
      color: ${props => props.theme.color.gray300};
      &:hover {
        color: ${props => props.theme.color.primary300};
      }
    }
  `;

  const Title = styled.h3`
    font-size: 2.2rem;
    margin-bottom: 1rem;
  `;

  const PersonList = styled.div<{ isDraggingOver: boolean }>`
    box-sizing: border-box;
    margin: 2rem 0;
    font-size: 1.8rem;
    transition: all 0.2s ease-in-out;
    padding: ${props => props.isDraggingOver && "1rem"};
    border-radius: 0.5rem;
    background-color: ${props =>
      props.isDraggingOver
        ? props.theme.color.primary300
        : props.theme.color.background100};
    flex-grow: 1;
    min-height: 100px;
  `;

  const AddPersonButton = styled.button`
    cursor: pointer;
    border: 0;
    padding: 1rem;
    border: 1px solid ${props => props.theme.color.gray300};
    border-radius: 0.5rem;
    background-color: unset;
    font-size: 1.7rem;
    text-align: left;
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.color.gray500};
    &:hover {
      border: 1px solid ${props => props.theme.color.primary300};
      background-color: ${props => props.theme.color.primary300};
      color: ${props => props.theme.color.fontColorWhite};
    }
  `;

  const Form = styled.form`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 1rem;
      font-size: 1.8rem;
      border: 1px solid ${props => props.theme.color.gray300};
    }
    .select-container {
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      position: relative;
      width: 100%;
      overflow: hidden;
      border: 1px solid ${props => props.theme.color.gray300};
      padding: 1rem;
    }
    .arrow-drop-down {
      position: absolute;
      z-index: -1;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }

    select {
      box-sizing: border-box;
      background-color: unset;
      cursor: pointer;
      font-size: 2rem;
      border: 0;
      outline: none;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }
  `;

  const SearchingBox = styled.ul`
    position: absolute;
    top: 4.5rem;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 2;
    width: 100%;
    max-height: 20rem;
    overflow-y: auto;
    border: 1px solid ${props => props.theme.color.gray300};
    border-top: 0;
    background-color: ${props => props.theme.color.background100};
  `;
  const SearchingItem = styled.li<{ isSelect?: boolean }>`
    display: grid;
    grid-template-columns: 3fr 0.5fr 0.5fr;
    align-items: center;
    cursor: pointer;
    font-size: 1.8rem;
    padding: 1rem 1rem;
    span {
      font-size: 1.2rem;
      font-weight: bold;
    }
    background-color: ${props =>
      props.isSelect && props.theme.color.primary300};
    &:hover {
      background-color: ${props => props.theme.color.primary700};
      color: ${props => props.theme.color.fontColorWhite};
    }
  `;

  interface IGroupProps {
    item: GroupProps;
  }

  interface SendPeople {
    _id?: string;
    name?: string;
    type?: "student" | "worker" | "new" | "etc";
  }
  interface Form {
    name?: string;
    type?: "student" | "worker" | "new" | "etc";
    place?: string;
    groupName?: string;
  }

  const Group = ({ item }: IGroupProps) => {
    const searchingListNodes = useRef<HTMLUListElement>(null);
    const [isSearchingBoxError, setSearchingBoxError] = useState(false);
    const [count, setCount] = useState(0);
    const [selectedNodeId, setSelectedNodeId] = useState("");

    const queryClient = useQueryClient();
    const [searchPersonName, setSearchPersonName] = useState("");
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
    } = useForm<Form>();

    const [isUpdate, setIsUpdate] = useState(false);
    const [isOpenPeopleInput, setIsOpenPeopleInput] = useState(false);
    const [searchPerson, setSearchPerson] = useState<People[] | null>();
    const { data, refetch } = useGet<People[] | null>({
      url: `/api/education/search?person=${searchPersonName}`,
      queryKey: "search",
      enabled: false,
      onSuccess: response => {
        setSearchPerson(response);
      },
    });

    const { data: people } = useGet<People[]>({
      url: `/api/education/group/${item._id}/people`,
      queryKey: ["people", item._id],
    });

    const { mutate: addNewPeople } = usePost<
      FetchDataProps<People[]>,
      Error,
      SendPeople
    >({
      url: `/api/education/group/${item._id}/people`,
      queryKey: ["people", item._id],
      method: "POST",
    });

    const { mutate: updateGroup } = usePost<
      FetchDataProps<GroupProps>,
      Error,
      {
        _id?: string;
        name?: string;
        place?: string;
        type?: "student" | "worker" | "new" | "etc";
      }
    >({
      url: `/api/education/group/update`,
      queryKey: "groups",
      method: "PATCH",
    });

    const {
      mutate: deleteGroupMutate,
      isConfirmModal,
      setIsConfirmModal,
      isDelete,
      setIsDelete,
    } = useDelete({
      url: `/api/education/group/${item._id}`,
      queryKey: "groups",
      onSuccess: () => {
        queryClient.invalidateQueries("groups");
      },
    });

    const openAddPeopleInput = () => {
      setIsOpenPeopleInput(!isOpenPeopleInput);
      reset({ name: "" });
      setSearchPersonName("");
      setSearchPerson([]);
    };

    const deleteGroup = () => {
      setIsConfirmModal(true);
    };

    const onSubmitNewPeopleName = handleSubmit(data => {
      if (selectedNodeId && searchPerson && searchPerson.length !== 0) {
        const [item] = searchPerson?.filter(
          value => value._id === selectedNodeId
        );
        selectItem(item);
        setIsOpenPeopleInput(!isOpenPeopleInput);
        reset({ name: "" });
        setSearchPersonName("");
        setSearchPerson([]);
        return;
      }

      addNewPeople(
        {
          name: data.name,
          type: item.type,
        },
        {
          onSuccess: () => {
            setSearchPerson([]);
            reset({ name: "" });
          },
          onError: err => {
            setSearchPerson([]);
            reset({ name: "" });
            setError("name", { message: err.message });
          },
        }
      );
      setIsOpenPeopleInput(!isOpenPeopleInput);
      reset({ name: "" });
      setSearchPersonName("");
      setSearchPerson([]);
    });

    const onSubmitUpdateGroupName = handleSubmit(data => {
      updateGroup({
        _id: item._id,
        name: data.groupName,
        type: data.type,
        place: data.place,
      });
      reset();
      setIsUpdate(false);
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchPersonName(() => e.target.value);
    };

    const selectItem = (person: People) => {
      const hasHuman = item.humanIds.some(value => value === person._id);
      if (hasHuman) {
        setSearchingBoxError(true);
        return;
      }
      addNewPeople({ _id: person._id });
      reset({ name: "" });
    };

    const handleSearchBoxWithKey = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "ArrowUp") {
        setCount(count - 1);
      }

      if (e.key === "ArrowDown") {
        setCount(count + 1);
      }

      if (e.key === "Escape") {
        setSearchPerson([]);
        setIsOpenPeopleInput(false);
      }
    };

    const findNodes = (count: number) => {
      const list = searchingListNodes.current?.childNodes;
      const select = list ? Array.from(list) : [];
      const [li] = select.filter(
        (value, index) => index === count
      ) as HTMLLIElement[];
      const selectId = li && li.dataset.id;
      setSelectedNodeId(() => String(selectId));
      return li;
    };

    const selectNode = (count: number) => {
      const li = findNodes(count);
      let num = 0 - count;
      if (searchingListNodes && li && num <= 0) {
        searchingListNodes.current?.scrollTo(0, li.offsetTop);
      }

      if (searchingListNodes && li && num >= 0) {
        searchingListNodes.current?.scrollTo(li.offsetTop, 0);
      }
    };

    useEffect(() => {
      const length = searchPerson?.length as number;

      if (count < 0) {
        setCount(length - 1);
        return;
      }

      if (count >= length) {
        setCount(0);
        return;
      }

      selectNode(count);
    }, [searchPerson, count, setCount]);

    useEffect(() => {
      if (isDelete) {
        deleteGroupMutate();
        setIsConfirmModal(false);
        setIsDelete(false);
      }
    }, [isDelete]);

    useDebouncedEffect(() => refetch(), 300, [searchPersonName]);

    useEffect(() => {
      const timeout = setTimeout(() => setSearchingBoxError(false), 3000);
      return () => clearTimeout(timeout);
    }, [isSearchingBoxError, setSearchingBoxError]);
    const personName = useRef<HTMLInputElement>(null);
    return (
      <>
        {isConfirmModal && (
          <ConfirmDeleteModal
            setIsModal={setIsDelete}
            setIsConfirm={setIsConfirmModal}
            title="그룹을 삭제하시겠습니까?"
            subtitle="그룹을 삭제하면 복구할 수 없습니다. 참가자는 그대로 남습니다."
          />
        )}
        <Container data-id={item._id}>
          <Header>
            {!isUpdate ? (
              <>
                <div className="group-info">
                  <Title>{item.name}</Title>
                  <span>{item.place}</span>
                </div>
                <ButtonContainer>
                  <button onClick={openAddPeopleInput}>
                    <MdPersonAdd />
                  </button>
                  <button onClick={() => setIsUpdate(true)}>
                    <MdEdit />
                  </button>
                  <button onClick={deleteGroup}>
                    <MdDelete />
                  </button>
                </ButtonContainer>
              </>
            ) : (
              <>
                <Form onSubmit={onSubmitUpdateGroupName}>
                  <input
                    autoComplete="off"
                    id="groupName"
                    defaultValue={item.name}
                    placeholder="이름을 적고 엔터!"
                    type="text"
                    {...register("groupName")}
                  />
                  <input
                    autoComplete="off"
                    id="place"
                    defaultValue={item.place}
                    placeholder="교환할 장소?"
                    type="text"
                    {...register("place")}
                  />
                  <span className="select-container">
                    <select defaultValue={item.type} {...register("type")}>
                      <option value="student">학생</option>
                      <option value="worker">직장</option>
                      <option value="new">새신자</option>
                      <option value="etc">기타</option>
                    </select>
                    <span className="arrow-drop-down">
                      <MdArrowDropDown />
                    </span>
                  </span>
                  <input type="submit" hidden={true} />
                </Form>
                <ButtonContainer>
                  <button onClick={onSubmitUpdateGroupName}>
                    <MdEdit />
                  </button>
                </ButtonContainer>
              </>
            )}
          </Header>
          {isOpenPeopleInput && (
            <>
              <Form onSubmit={onSubmitNewPeopleName}>
                <input
                  id="name"
                  placeholder="이름을 적고 엔터!"
                  type="text"
                  value={searchPersonName}
                  autoComplete="off"
                  {...register("name", {
                    required: "이름을 꼭 입력해야합니다.",
                    onChange: handleSearch,
                  })}
                  onKeyDown={e => handleSearchBoxWithKey(e)}
                />

                {searchPerson?.length === 0 ? (
                  <SearchingBox>
                    <SearchingItem>
                      <p>검색어 또는 추가할 이름을 입력하세요.</p>
                    </SearchingItem>
                  </SearchingBox>
                ) : (
                  <SearchingBox ref={searchingListNodes}>
                    {isSearchingBoxError && (
                      <span>이미 참가하고 있습니다.</span>
                    )}
                    {searchPerson?.map(value => (
                      <SearchingItem
                        key={value._id}
                        data-id={value._id}
                        isSelect={
                          selectedNodeId ? value._id === selectedNodeId : false
                        }
                        onClick={() => selectItem(value)}
                      >
                        <p>{value.name}</p>
                        <span>{value.sex === "male" ? "남자" : "여자"}</span>
                        <span>
                          {translateEducationTypeNameToKR(value.type)}
                        </span>
                      </SearchingItem>
                    ))}
                  </SearchingBox>
                )}

                <label>{errors.name?.message}</label>
              </Form>
            </>
          )}
          <Droppable droppableId={item._id}>
            {(provided, snapshot) => (
              <PersonList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {people?.map((person, index) => (
                  <Human
                    key={person._id}
                    index={index}
                    person={person}
                    groupId={item._id}
                  />
                ))}
                {provided.placeholder}
              </PersonList>
            )}
          </Droppable>
        </Container>
      </>
    );
  };

  export default Group;
  ```

  </details>

```tsx
const Group = ({ item }: IGroupProps) => {
  const queryClient = useQueryClient();

  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenPeopleInput, setIsOpenPeopleInput] = useState(false);
  const [searchPerson, setSearchPerson] = useState<People[] | null>();
  const { data, refetch } = useGet<People[] | null>({
    url: `/api/education/search?person=${searchPersonName}`,
    queryKey: "search",
    enabled: false,
    onSuccess: response => {
      setSearchPerson(response);
    },
  });

  const { data: people } = useGet<People[]>({
    url: `/api/education/group/${item._id}/people`,
    queryKey: ["people", item._id],
  });

  const { mutate: addNewPeople } = usePost<
    FetchDataProps<People[]>,
    Error,
    SendPeople
  >({
    url: `/api/education/group/${item._id}/people`,
    queryKey: ["people", item._id],
    method: "POST",
  });

  const { mutate: updateGroup } = usePost<
    FetchDataProps<GroupProps>,
    Error,
    {
      _id?: string;
      name?: string;
      place?: string;
      type?: "student" | "worker" | "new" | "etc";
    }
  >({
    url: `/api/education/group/update`,
    queryKey: "groups",
    method: "PATCH",
  });

  const {
    mutate: deleteGroupMutate,
    isConfirmModal,
    setIsConfirmModal,
    isDelete,
    setIsDelete,
  } = useDelete({
    url: `/api/education/group/${item._id}`,
    queryKey: "groups",
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
    },
  });

  const deleteGroup = () => {
    setIsConfirmModal(true);
  };

  const onSubmitNewPeopleName = handleSubmit(data => {
    if (selectedNodeId && searchPerson && searchPerson.length !== 0) {
      const [item] = searchPerson?.filter(
        value => value._id === selectedNodeId
      );
      selectItem(item);
      setIsOpenPeopleInput(!isOpenPeopleInput);
      reset({ name: "" });
      setSearchPersonName("");
      setSearchPerson([]);
      return;
    }

    addNewPeople(
      {
        name: data.name,
        type: item.type,
      },
      {
        onSuccess: () => {
          setSearchPerson([]);
          reset({ name: "" });
        },
        onError: err => {
          setSearchPerson([]);
          reset({ name: "" });
          setError("name", { message: err.message });
        },
      }
    );
    setIsOpenPeopleInput(!isOpenPeopleInput);
    reset({ name: "" });
    setSearchPersonName("");
    setSearchPerson([]);
  });

  const onSubmitUpdateGroupName = handleSubmit(data => {
    updateGroup({
      _id: item._id,
      name: data.groupName,
      type: data.type,
      place: data.place,
    });
    reset();
    setIsUpdate(false);
  });

  const selectItem = (person: People) => {
    const hasHuman = item.humanIds.some(value => value === person._id);
    if (hasHuman) {
      setSearchingBoxError(true);
      return;
    }
    addNewPeople({ _id: person._id });
    reset({ name: "" });
  };

  useEffect(() => {
    if (isDelete) {
      deleteGroupMutate();
      setIsConfirmModal(false);
      setIsDelete(false);
    }
  }, [isDelete]);

  const personName = useRef<HTMLInputElement>(null);
  return (
    <>
      {isConfirmModal && (
        <ConfirmDeleteModal
          setIsModal={setIsDelete}
          setIsConfirm={setIsConfirmModal}
          title="그룹을 삭제하시겠습니까?"
          subtitle="그룹을 삭제하면 복구할 수 없습니다. 참가자는 그대로 남습니다."
        />
      )}
    </>
  );
};

export default Group;
```

- after
  <details>
  <summary>after 전체 코드</summary>

  ```tsx
  import React, { useEffect, useRef, useState } from "react";
  import styled from "styled-components";
  import Human from "./Human/Human";
  import { Droppable } from "react-beautiful-dnd";
  import { useForm } from "react-hook-form";
  import {
    MdArrowDropDown,
    MdDelete,
    MdEdit,
    MdPersonAdd,
  } from "react-icons/md";
  import { ConfirmDeleteModal } from "@/components";
  import { People, Group as GroupProps } from "@/state";

  import { translateEducationTypeNameToKR } from "@/lib/utils";
  import { useDebouncedEffect, useModalContorl } from "@/lib/hooks";
  import {
    useAddNewPerson,
    useGetPeople,
    useDeleteGroup,
    useEducaionSearchPerson,
    useUpdateGroup,
  } from "../hooks";

  const Container = styled.div`
    border: 1px solid ${props => props.theme.color.gray300};
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  `;

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .group-info {
      display: flex;
      span {
        margin-left: 0.5rem;
      }
    }
  `;

  const ButtonContainer = styled.div`
    button {
      cursor: pointer;
      background-color: unset;
      border: 0;
      font-size: 2.5rem;
      color: ${props => props.theme.color.gray300};
      &:hover {
        color: ${props => props.theme.color.primary300};
      }
    }
  `;

  const Title = styled.h3`
    font-size: 2.2rem;
    margin-bottom: 1rem;
  `;

  const PersonList = styled.div<{ isDraggingOver: boolean }>`
    box-sizing: border-box;
    margin: 2rem 0;
    font-size: 1.8rem;
    transition: all 0.2s ease-in-out;
    padding: ${props => props.isDraggingOver && "1rem"};
    border-radius: 0.5rem;
    background-color: ${props =>
      props.isDraggingOver
        ? props.theme.color.primary300
        : props.theme.color.background100};
    flex-grow: 1;
    min-height: 100px;
  `;

  const AddPersonButton = styled.button`
    cursor: pointer;
    border: 0;
    padding: 1rem;
    border: 1px solid ${props => props.theme.color.gray300};
    border-radius: 0.5rem;
    background-color: unset;
    font-size: 1.7rem;
    text-align: left;
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.color.gray500};
    &:hover {
      border: 1px solid ${props => props.theme.color.primary300};
      background-color: ${props => props.theme.color.primary300};
      color: ${props => props.theme.color.fontColorWhite};
    }
  `;

  const Form = styled.form`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    input {
      box-sizing: border-box;
      width: 100%;
      padding: 1rem;
      font-size: 1.8rem;
      border: 1px solid ${props => props.theme.color.gray300};
    }
    .select-container {
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      position: relative;
      width: 100%;
      overflow: hidden;
      border: 1px solid ${props => props.theme.color.gray300};
      padding: 1rem;
    }
    .arrow-drop-down {
      position: absolute;
      z-index: -1;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }
    select {
      box-sizing: border-box;
      background-color: unset;
      cursor: pointer;
      font-size: 2rem;
      border: 0;
      outline: none;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }
  `;

  const SearchingBox = styled.ul`
    position: absolute;
    top: 4.5rem;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 2;
    width: 100%;
    max-height: 20rem;
    overflow-y: auto;
    border: 1px solid ${props => props.theme.color.gray300};
    border-top: 0;
    background-color: ${props => props.theme.color.background100};
  `;
  const SearchingItem = styled.li<{ isSelect?: boolean }>`
    display: grid;
    grid-template-columns: 3fr 0.5fr 0.5fr;
    align-items: center;
    cursor: pointer;
    font-size: 1.8rem;
    padding: 1rem 1rem;
    span {
      font-size: 1.2rem;
      font-weight: bold;
    }
    background-color: ${props =>
      props.isSelect && props.theme.color.primary300};
    &:hover {
      background-color: ${props => props.theme.color.primary700};
      color: ${props => props.theme.color.fontColorWhite};
    }
  `;

  interface IGroupProps {
    item: GroupProps;
  }

  interface Form {
    name?: string;
    type?: "student" | "worker" | "new" | "etc";
    place?: string;
    groupName?: string;
  }

  const Group = ({ item }: IGroupProps) => {
    const searchingListNodes = useRef<HTMLUListElement>(null);
    const [isSearchingBoxError, setSearchingBoxError] = useState(false);
    const [count, setCount] = useState(0);
    const [selectedNodeId, setSelectedNodeId] = useState("");
    const [searchPersonName, setSearchPersonName] = useState("");

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
    } = useForm<Form>();

    const [isUpdate, setIsUpdate] = useState(false);
    const [isOpenPeopleInput, setIsOpenPeopleInput] = useState(false);
    const [searchPerson, setSearchPerson] = useState<People[] | null>();

    const { isModal, isConfirm, setIsConfirm, setIsModal } = useModalContorl();

    const { mutate: addNewPeople } = useAddNewPerson();
    const { mutate: deleteGroupMutate } = useDeleteGroup();
    const { mutate: updateGroup } = useUpdateGroup();
    const { data: people } = useGetPeople(item._id);
    const { refetch } = useEducaionSearchPerson(
      searchPersonName,
      setSearchPerson
    );

    useDebouncedEffect(() => refetch(), 300, [searchPersonName]);

    const openAddPeopleInput = () => {
      setIsOpenPeopleInput(!isOpenPeopleInput);
      reset({ name: "" });
      setSearchPersonName("");
      setSearchPerson([]);
    };

    const deleteGroup = () => {
      setIsModal(true);
    };

    const onSubmitNewPeopleName = handleSubmit(data => {
      if (selectedNodeId && searchPerson && searchPerson.length !== 0) {
        const [selectedItem] = searchPerson?.filter(
          person => person._id === selectedNodeId
        );
        selectItem(selectedItem);
      } else if (data.name) {
        addNewPeople(
          {
            id: item._id,
            body: {
              name: data.name,
              type: item.type,
            },
          },
          {
            onSuccess: () => {
              setSearchPerson([]);
              reset({ name: "" });
            },
            onError: err => {
              setSearchPerson([]);
              reset({ name: "" });
              setError("name", { message: err.message });
            },
          }
        );
      }

      setIsOpenPeopleInput(!isOpenPeopleInput);
      reset({ name: "" });
      setSearchPersonName("");
      setSearchPerson([]);
    });

    const onSubmitUpdateGroupName = handleSubmit(data => {
      const id = item._id;
      const body = {
        _id: id,
        name: data.groupName,
        type: data.type,
        place: data.place,
      };
      if (id) {
        updateGroup({ body });
        reset();
        setIsUpdate(false);
      }
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchPersonName(() => e.target.value);
    };

    const selectItem = (person: People) => {
      const hasHuman = item.humanIds.some(value => value === person._id);
      if (hasHuman) {
        setSearchingBoxError(true);
        return;
      }
      addNewPeople({ id: item._id, body: { _id: person._id } });
      reset({ name: "" });
    };

    const handleSearchBoxWithKey = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "ArrowUp") {
        setCount(count - 1);
      }

      if (e.key === "ArrowDown") {
        setCount(count + 1);
      }

      if (e.key === "Escape") {
        setSearchPerson([]);
        setIsOpenPeopleInput(false);
      }
    };

    const findNodes = (count: number) => {
      const list = searchingListNodes.current?.childNodes;
      const select = list ? Array.from(list) : [];
      const [li] = select.filter(
        (value, index) => index === count
      ) as HTMLLIElement[];
      const selectId = li && li.dataset.id;
      setSelectedNodeId(() => String(selectId));
      return li;
    };

    const selectNode = (count: number) => {
      const li = findNodes(count);
      let num = 0 - count;
      if (searchingListNodes && li && num <= 0) {
        searchingListNodes.current?.scrollTo(0, li.offsetTop);
      }

      if (searchingListNodes && li && num >= 0) {
        searchingListNodes.current?.scrollTo(li.offsetTop, 0);
      }
    };

    useEffect(() => {
      const length = searchPerson?.length as number;

      if (count < 0) {
        setCount(length - 1);
        return;
      }

      if (count >= length) {
        setCount(0);
        return;
      }

      selectNode(count);
    }, [searchPerson, count, setCount]);

    useEffect(() => {
      const id = item._id;
      if (isConfirm && id) {
        deleteGroupMutate(id);
        setIsConfirm(false);
        setIsModal(false);
      }
    }, [isConfirm]);

    useEffect(() => {
      const timeout = setTimeout(() => setSearchingBoxError(false), 3000);
      return () => clearTimeout(timeout);
    }, [isSearchingBoxError, setSearchingBoxError]);

    return (
      <>
        {isModal && (
          <ConfirmDeleteModal
            setIsModal={setIsModal}
            setIsConfirm={setIsConfirm}
            title="그룹을 삭제하시겠습니까?"
            subtitle="그룹을 삭제하면 복구할 수 없습니다. 참가자는 그대로 남습니다."
          />
        )}
        <Container data-id={item._id}>
          <Header>
            {!isUpdate ? (
              <>
                <div className="group-info">
                  <Title>{item.name}</Title>
                  <span>{item.place}</span>
                </div>
                <ButtonContainer>
                  <button onClick={openAddPeopleInput}>
                    <MdPersonAdd />
                  </button>
                  <button onClick={() => setIsUpdate(true)}>
                    <MdEdit />
                  </button>
                  <button onClick={deleteGroup}>
                    <MdDelete />
                  </button>
                </ButtonContainer>
              </>
            ) : (
              <>
                <Form onSubmit={onSubmitUpdateGroupName}>
                  <input
                    autoComplete="off"
                    id="groupName"
                    defaultValue={item.name}
                    placeholder="이름을 적고 엔터!"
                    type="text"
                    {...register("groupName")}
                  />
                  <input
                    autoComplete="off"
                    id="place"
                    defaultValue={item.place}
                    placeholder="교환할 장소?"
                    type="text"
                    {...register("place")}
                  />
                  <span className="select-container">
                    <select defaultValue={item.type} {...register("type")}>
                      <option value="student">학생</option>
                      <option value="worker">직장</option>
                      <option value="new">새신자</option>
                      <option value="etc">기타</option>
                    </select>
                    <span className="arrow-drop-down">
                      <MdArrowDropDown />
                    </span>
                  </span>
                  <input type="submit" hidden={true} />
                </Form>
                <ButtonContainer>
                  <button onClick={onSubmitUpdateGroupName}>
                    <MdEdit />
                  </button>
                </ButtonContainer>
              </>
            )}
          </Header>
          {isOpenPeopleInput && (
            <>
              <Form onSubmit={onSubmitNewPeopleName}>
                <input
                  id="name"
                  placeholder="이름을 적고 엔터!"
                  type="text"
                  value={searchPersonName}
                  autoComplete="off"
                  {...register("name", {
                    required: "이름을 꼭 입력해야합니다.",
                    onChange: handleSearch,
                  })}
                  onKeyDown={e => handleSearchBoxWithKey(e)}
                />

                {searchPerson?.length === 0 ? (
                  <SearchingBox>
                    <SearchingItem>
                      <p>검색어 또는 추가할 이름을 입력하세요.</p>
                    </SearchingItem>
                  </SearchingBox>
                ) : (
                  <SearchingBox ref={searchingListNodes}>
                    {isSearchingBoxError && (
                      <span>이미 참가하고 있습니다.</span>
                    )}
                    {searchPerson?.map(value => (
                      <SearchingItem
                        key={value._id}
                        data-id={value._id}
                        isSelect={
                          selectedNodeId ? value._id === selectedNodeId : false
                        }
                        onClick={() => selectItem(value)}
                      >
                        <p>{value.name}</p>
                        <span>{value.sex === "male" ? "남자" : "여자"}</span>
                        <span>
                          {translateEducationTypeNameToKR(value.type)}
                        </span>
                      </SearchingItem>
                    ))}
                  </SearchingBox>
                )}

                <label>{errors.name?.message}</label>
              </Form>
            </>
          )}
          <Droppable droppableId={item._id}>
            {(provided, snapshot) => (
              <PersonList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {people?.map((person, index) => (
                  <Human
                    key={person._id}
                    index={index}
                    person={person}
                    groupId={item._id}
                  />
                ))}
                {provided.placeholder}
              </PersonList>
            )}
          </Droppable>
        </Container>
      </>
    );
  };

  export default Group;
  ```

  </details>

```tsx
const Group = ({ item }: IGroupProps) => {
  const { isModal, isConfirm, setIsConfirm, setIsModal } = useModalContorl();

  const { mutate: addNewPeople } = useAddNewPerson();
  const { mutate: deleteGroupMutate } = useDeleteGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { data: people } = useGetPeople(item._id);
  const { refetch } = useEducaionSearchPerson(
    searchPersonName,
    setSearchPerson
  );

  const deleteGroup = () => {
    setIsModal(true);
  };

  const onSubmitNewPeopleName = handleSubmit(data => {
    if (selectedNodeId && searchPerson && searchPerson.length !== 0) {
      const [selectedItem] = searchPerson?.filter(
        person => person._id === selectedNodeId
      );
      selectItem(selectedItem);
    } else if (data.name) {
      addNewPeople(
        {
          id: item._id,
          body: {
            name: data.name,
            type: item.type,
          },
        },
        {
          onSuccess: () => {
            setSearchPerson([]);
            reset({ name: "" });
          },
          onError: err => {
            setSearchPerson([]);
            reset({ name: "" });
            setError("name", { message: err.message });
          },
        }
      );
    }

    setIsOpenPeopleInput(!isOpenPeopleInput);
    reset({ name: "" });
    setSearchPersonName("");
    setSearchPerson([]);
  });

  const onSubmitUpdateGroupName = handleSubmit(data => {
    const id = item._id;
    const body = {
      _id: id,
      name: data.groupName,
      type: data.type,
      place: data.place,
    };
    if (id) {
      updateGroup({ body });
      reset();
      setIsUpdate(false);
    }
  });

  const selectItem = (person: People) => {
    const hasHuman = item.humanIds.some(value => value === person._id);
    if (hasHuman) {
      setSearchingBoxError(true);
      return;
    }
    addNewPeople({ id: item._id, body: { _id: person._id } });
    reset({ name: "" });
  };

  useEffect(() => {
    const id = item._id;
    if (isConfirm && id) {
      deleteGroupMutate(id);
      setIsConfirm(false);
      setIsModal(false);
    }
  }, [isConfirm]);

  return (
    <>
      {isModal && (
        <ConfirmDeleteModal
          setIsModal={setIsModal}
          setIsConfirm={setIsConfirm}
          title="그룹을 삭제하시겠습니까?"
          subtitle="그룹을 삭제하면 복구할 수 없습니다. 참가자는 그대로 남습니다."
        />
      )}
    </>
  );
};

export default Group;
```

## 마무리

관심사의 분리는 그나마 나중에 코드를 돌아보고 과거의 나에게 욕을 덜하게 하는 좋은 도구인 것 같다. 이번에는 목표가 비동기와 뷰를 분리하는 것이었다. 그것을 개선한 것 만으로도 코드를 읽으면서 마음이 편안해진다. 무엇을 분리하고 무엇을 통합해서 반복을 줄여나가고 우아한 코드를 작성할지는 계속 고민하고 연습해야할 것 같다. 원티드 프리온보딩 코스가 그런 의미에서 많은 도움이 됐던 것 같다.

이번에 리펙토링을 하면서 과제가 하나 더 생겼다. 스타일 컴포넌트를 쓰면서 스타일 코드와 뷰가 뒤섞여있어서 수직으로 스크롤을 왔다 갔다 하는게 만만치 않다. 어떻게 분리해야할지 아직 감은 안잡히지만 배웠던 것을 바탕으로 개선을 해봐야겠다.(성능 개선도 해야하는데 ㅜㅠ)

이번 기회에 코드를 돌아볼 수 있어서 다행이었다. 운이 좋았다. 내가 코드를 작성하면서 일단 동작을 하게 하는 것을 중요하게 생각했던 것 같다. 그리고 나중에 고쳐야지라고 생각했을지도 모른다. 팀 프로젝트를 하면서도 ‘일단 동작시키고 나중에 고쳐요'라는 말을 듣고 그때는 그냥 동의를 했었다. 하지만 지금은 아니다. 왜냐하면 팀 프로젝트 때 작성했던 코드를 지금 돌아보지 않기 때문이다. 동작하는 코드는 기본이다. 다른 사람이 나중에 봤을 때, 키보드 샷건 치는 코드는 작성하지 않는 것이 필요하다.

[우테코 라이브](https://www.youtube.com/watch?v=ssDMIcPBqUE)에서 강사님이 건축 설계와 소프트웨어의 차이를 설명하시면서 소프트웨어는 설계를 철저하게 하지 않으면 미래의 개발 비용이 비약적으로 늘어날 수 있다는 이야기를 했었다. 클린 코드에서는 회사가 망한 사례도 이야기한다. 회사에 들어가서 내가 열심히 코드를 작성하는 것도 일이지만 미래의 개발 부채를 최소한으로 하기 위해 코드를 작성하는 개발자가 되고 싶다.
