# Mutable-Music-App

Make A Mutable App By ImmutaJs😼

## 挖挖挖坑

- 暂时不启用严格的 tsx 检查

- `styled-components` 与 `ts` 协作

- react-router-config

实现命令式路由，很像Vue-router

- forwardRef 与 useImperativeHandle

  - useRef，使函数式组件也能够享受到获取DOM元素或者自定义组件，父组件获取子组件引用而后调用子组件方法，如focus等。
  - forwardRef，可以获取父组件的ref实例作为子组件的参数（与props同级），然后再把这个ref绑定到自己内部节点，就可以实现ref的透传了！
  - useImperativeHandle，常与forwardRef搭配使用，可以控制向父组件暴露的属性以及方法，第一个参数即为forwardRef包裹后得到的父组件ref实例。

    ```tsx
    const Test: FC = (): JSX.Element => {
      const testRef: MutableRefObject<any> = useRef("faaather");
      const handleClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
        console.log("自身button的内容：", e.currentTarget.innerText);
        console.log("子组件input的对象:", testRef.current);
        console.log("子组件input的value值：", testRef.current.value);
        console.log("子组件input的类型：", testRef.current.type());
      };
      return (
        <Fragment>
          <TestChildForward ref={testRef} />
          <button onClick={handleClick}>获取子组件的input的value和type</button>
        </Fragment>
      );
    };
    export default Test;

    function TestChild(props: {}, ref: Ref<any>): JSX.Element {
      const testRef: MutableRefObject<any> = useRef(); //创建一个自身的ref，绑定到标签节点上
      console.log(ref);
      //暴露出一个想要让父组件知道的对象,里面可以是属性也可以是函数
      useImperativeHandle(ref, () => {
        //第一个参数，要暴露给哪个(ref)？第二个参数要暴露出什么？
        return {
          //(testRef.current as HTMLInputElement) 类型断言，自己肯定就是这样的类型
          value: (testRef.current as HTMLInputElement).value, //暴露出input的value
          type: () => (testRef.current as HTMLInputElement).type, //暴露出input的type类型
          test: "test"
        };
      });
      return (
        <>
          <input
            type="text"
            value={"input的内容"}
            ref={testRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(e.currentTarget.value);
              console.log(e.currentTarget.type);
            }}
          />
        </>
      );
    }
    export const TestChildForward: ForwardRefExoticComponent<any> = memo(
      forwardRef(TestChild)
    );

    ```

## 为什么是...？

### Styled-Components

`All In Js`！
它解决了哪些痛点？

- CSS 耦合程度高
- 支持预处理器如嵌套语法
- CSS 代码现在可以处理逻辑了！
- 语义化，总觉得 Html5 的语义化少了点什么吧？
