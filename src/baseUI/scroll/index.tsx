import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  RefObject,
  useMemo
} from "react";
import Loading from "../loading";
import LoadingV2 from "../loading-bottom";
import BScroll from "better-scroll";
import { ScrollContainer, PullUpLoading, PullDownLoading } from "./style";
import { debounce } from "../../api/util";

interface IScroll {
  direction: "vertical" | "horizental"; // 滚动方向
  click: boolean;
  refresh: boolean;
  onScroll: ({ x: any }: any) => void; // 滑动触发的回调
  pullUpLoading: boolean; // 上拉加载逻辑
  pullDownLoading: boolean; // 下拉加载逻辑
  pullUp: () => void; // 是否显示上拉 loading 动画
  pullDown: () => void; // 下拉loading动画
  bounceTop: boolean; // 是否支持向上吸顶
  bounceBottom: boolean; // 是否支持向下吸底
  className: string;
  ref: RefObject<any>;
}

type IS = Partial<IScroll>;

const Scroll: React.FC<IS> = forwardRef((props, ref) => {
  // console.log(ref);
  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState<BScroll | null>();
  //current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef();
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
    children
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp as () => {}, 300);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown as () => {}, 300);
  }, [pullDown]);

  // 每次重渲染刷新BS实例
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current!, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

  // 初始化时为实例绑定refresh事件
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 上拉到底
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    // BS类继承于EventEmitter类，懂伐？
    // 这里应该是它自己实现了scroll事件监听
    bScroll.on("scroll", (scroll: any) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  // 下拉判断
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", (pos: { y: number }) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll, pullDownDebounce]);

  // 下拉
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll, pullUpDebounce]);

  // // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };

  return (
    <>
      <ScrollContainer
        ref={(scrollContaninerRef as unknown) as RefObject<HTMLDivElement>}
      >
        {children}
        {/* 滑到底部加载动画 */}
        <PullUpLoading style={PullUpdisplayStyle}>
          <Loading></Loading>
        </PullUpLoading>
        {/* 顶部下拉刷新动画 */}
        <PullDownLoading style={PullDowndisplayStyle}>
          <LoadingV2></LoadingV2>
        </PullDownLoading>
      </ScrollContainer>
    </>
  );
});

// TODO: inject default by class of ts
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: () => {},
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: () => {},
  pullDown: () => {},
  bounceTop: true,
  bounceBottom: true
};
export default Scroll;
