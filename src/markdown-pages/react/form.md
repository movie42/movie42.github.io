---
slug: "/blog/react/many-form"
date: "2022-04-21"
title: "react-hook-form으로 여러개의 폼 데이터 전송하기"
tags: ["javascript", "react", "hooks", "team project"]
---

프로젝트를 진행하면서 여러개의 form 데이터를 서버로 전송해야하는 로직이 필요했다. react-hook-form을 사용하면 매우 간편하게 form 데이터를 모을 수 있다. [공식 문서](https://react-hook-form.com/advanced-usage)에서 다양한 예제를 제공하고 있기 때문에 서식을 개발 할 때 쉽게 개발이 가능하다.

## 여러 데이터 한번에 수정하기

지금까지 사용해봤던 CMS 툴은 수정을 할 때, 데이터를 개별적으로만 수정이 가능했기 때문에 매우 불편했다. 물론 제공하고 있는 옵션이 많기 때문이고, 여러 가지를 한번에 수정할 필요가 없기 때문일 수도 있다. 하지만 지금 만들고 있는 프로젝트에서 상품 등록을 위한 서식은 매우 간소했다. 간소한 작업이 여러번 반복되면 사용자 입장에서 짜증이 날 것 같았다.

```tsx
const FormField =({product})=>{
    return (
    <fieldset>
        <input {...register("name")} />
        <input {...register("price")} />
        <textarea {...register("desc")}></textarea>
    </fieldset>)
}

const UpdateItem = () => {
  const [selectItem, setSelectItem] = useRecoilState(selectListState);
  return (
    <form>
    {selectItem.map(product=>
        <FormField product={product}>
    )}

    </form>
  );
};
```

selectItem을 받아서 화면에 수정해야할 product를 개별적으로 그려줄 수 있다. FormField를 재사용이 가능하도록 설계하기 위해서 몇 가지를 컴포넌트로 만들어주어야한다. 먼저 input 등 form의 요소를 컴포넌트로 만들어준다. 또한 modal로 상태를 받아 그려주고 있기 때문에 버튼을 눌렀을 때, 최종적으로는 선택된 상태값을 전역으로 관리하는게 가장 편리하다. 그렇게 하면 깊이가 깊어지더라도 props로 modal을 제어하기 위한 함수를 여러번 보내주지 않아도 된다.

가장 문제가 되는 부분은 selectItem의 개수는 예측할 수 없기 때문에 선택되는 값에 관계 없이 FormField를 그려주고 데이터를 모을 수 있어야한다. 처음에 단순하게 react-hook-form에서 register를 넘겨주었지만 register는 name을 key로 사용하기 때문에 반복되는 데이터를 그려주지 못했다. 하지만 react-hook-form에서는 이런 상황에 대응할 수 있도록 [예제](https://codesandbox.io/s/6j1760jkjk?file=/src/index.js)를 제공하고 있다.

다시 재구성 한 코드는 아래와 같다.

```tsx
interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions;
  fieldName?: string;
  error?: string | undefined | null;
}

const Input = ({
  register,
  registerOptions,
  fieldName,
  error,
  ...props
}: IInputProps) => {
  return register ? (
    fieldName ? (
      <>
        <input
          {...props}
          {...register(`${fieldName}.${props.name}`, registerOptions)}
        />
        {error && <Label text={error} />}
      </>
    ) : (
      <>
        <input {...props} {...register(`${props.name}`, registerOptions)} />
        {error && <Label text={error} />}
      </>
    )
  ) : (
    <>
      <input {...props} />
      {error && <Label text={error} />}
    </>
  );
};

const Textarea = () => {
  // Input 컴포넌트와 똑같이 만들면 된다.
};

const FormField = ({ fieldName, register, product }) => {
  return (
    <fieldset data-id={product.id} name={fieldName}>
      <Input
        type="text"
        id="name"
        name="name"
        fieldName={fieldName}
        register={register}
        defaultValue={item.name}
      />
      <Input
        type="number"
        id="price"
        name="price"
        fieldName={fieldName}
        register={register}
        defaultValue={product.price}
      />
      <Textarea
        id="desc"
        name="desc"
        fieldName={fieldName}
        register={register}
        defaultValue={product.desc}
      ></Textarea>
    </fieldset>
  );
};

const UpdateItem = () => {
  const [selectItem, setSelectItem] = useRecoilState(selectListState);
  return (
    <form>
      {selectItem.map(product => {
        const formField = product.id;
        return (
          <FormField fieldName={fieldName} register={register} item={item} />
        );
      })}
    </form>
  );
};
```

react-hook-form에서 제공하는 [예제](https://codesandbox.io/s/6j1760jkjk?file=/src/index.js)와 거의 흡사한 코드이다. 이렇게 코드를 작성하면 fieldName으로 수정한 데이터를 묶어서 객체로 반환해준다.

## 고차 함수로 데이터 제어하기

객체로 반환된 값을 state에 반영하는 것은 어렵지 않다. 개발자마다 로직을 구현하는 방법이 다르기 때문에 각자가 편리한 대로 구현하면 된다. 나는 고차 함수를 사용해서 데이터를 제어하는게 편해서 그렇게 했다. Array method를 사용해서 제어하면 된다.

개인적으로 for문으로 하다보면 점점 코드가 이해하기 어려워지고 중첩이 많아져서 map, filter, some과 같은 함수를 모듈처럼 이어 붙여서 list를 제어하는 것을 선호하게 된다. [Array와 관련된 method는 mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)에 잘 정리되어있다.

```tsx
// data는 react-hook-form의 onSubmit으로 받은 값이다.

const dataArray = Object.entries(data);

const newProductList = productList.map(product => {
  const selectProduct = dataArray.some(updateProduct => {
    const [key, value] = updateProduct;
    selectValue = value;
    return Number(key) === product.id;
  });

  if (selectProduct) {
    return { ...product, ...selectValue };
  }
  return product;
});
```

## 마무리

프로그래밍 언어는 사람이 만들었기 때문에 '이런 기능을 만들 수 있을까?'라고 생각한 것은 왠만하면 다 구현이 가능한 것 같다. 다만 '왜'라는 스스로 고민하는 과정은 아마 프로그래밍에서 코드를 짜는 것 이상으로 중요할지도 모른다. 프론트 앤드 개발자로써 '왜'라는 질문을 하게 될 때, 사용자에게 좋은 경험을 제공하고 싶기 때문인 경우가 많다. 그런데 사용자에게 좋은 경험을 제공하는 UI는 고려해야할 사항이 많기 때문에 UI를 제작하는 과정이 꽤 까다롭다. 컴포넌트의 수가 늘어나면서 상태 관리가 기하급수적으로 늘어나고 개발 환경을 관리하는 것도 매우 까다로워진다. 하지만 까다로운 상태 그 문제를 해결해가는 과정이 프로그래밍이 아닌가 싶다.
