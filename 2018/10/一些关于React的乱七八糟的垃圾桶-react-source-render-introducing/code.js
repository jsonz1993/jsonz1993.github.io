// demo code 
class H extends React.Component {
  render() {
    return (
      <h1 id="h1" >Hello {this.props.text}!</h1>
    )
  }
}

class T extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       text: 'world'
     }
  }

  te(a) {
    if (a == 2) {
      Array.from(Array(10), (item, i)=> i).forEach(()=> this.setState({
        text: this.state.text,
      }));
    }
    this.setState({
      text: text.includes('jsonz')? 'world'+a: 'jsonz'+a
    });
  }


  render() {
    const text = this.state.text;
    const style = {color: 'red', fontSize: '12px' };
    return (
        <div onClick={()=> console.log(1)} id="HostComponent">
          <H text={text}/>
          <button style={style} onClick={()=> this.te(1)} ref={t=> this.button1 = t}>按钮1</button>
          <button style={style} onClick={()=> this.te(2)} ref={(t)=> {
            this.button2 = t;
            console.log(t);
          }}>按钮2</button>
        </div>
    )
  }
}

T.defaultProps = {
  color: 'blue'
};

const test = ReactDOM.render(
  <T />,
  document.getElementById('container'),
  ()=> console.log(this),
);





export function processUpdateQueue<State>(
  workInProgress: Fiber,
  queue: UpdateQueue<State>,
  props: any,
  instance: any,
  renderExpirationTime: ExpirationTime,
): void {
  hasForceUpdate = false;

  // 确保工作的队列是一个克隆的，（方便暂停等操作
  // 里面的工作是如果当前工作的队列和工作队列一样，既 current.queue === queue。
  // 则把当前队列克隆到工作队列里面
  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);

  let newBaseState = queue.baseState;
  let newFirstUpdate = null;
  let newExpirationTime = NoWork;

  // 遍历更新队列
  // Iterate through the list of updates to compute the result.
  let update = queue.firstUpdate;
  let resultState = newBaseState;
  while (update !== null) {
    const updateExpirationTime = update.expirationTime;
    if (updateExpirationTime > renderExpirationTime) {
      // 这个更新没有足够的优先级，跳过他
    } else {
      // 有足够高优先级的更新，执行 && 计算新的结果
      resultState = getStateFromUpdate( workInProgress, queue, update, resultState, props, instance, );
      const callback = update.callback;
      if (callback !== null) {
        workInProgress.effectTag |= Callback;
        // Set this to null, in case it was mutated during an aborted render.
        update.nextEffect = null;
        if (queue.lastEffect === null) {
          queue.firstEffect = queue.lastEffect = update;
        } else {
          queue.lastEffect.nextEffect = update;
          queue.lastEffect = update;
        }
      }
    }
    // Continue to the next update.
    update = update.next;
  }



// 异步和交互式计算优先级
const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = 2;
export const LOW_PRIORITY_EXPIRATION = 5000;
export const LOW_PRIORITY_BATCH_SIZE = 250;
export const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
export const HIGH_PRIORITY_BATCH_SIZE = 100;

// currentTime 为本次更新已花费的时间
function computeExpirationBucket( currentTime, expirationInMs, bucketSizeMs ) {
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(
      currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE,
    )
  );
}

// 计算交互式情况的更新优先级
export function computeInteractiveExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE,
  );

// 计算异步情况的更新优先级
export function computeAsyncExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE,
  );
}


