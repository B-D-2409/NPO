import InfiniteScroll from 'react-infinite-scroll-component';

export function InfiniteScrollWrapper({
  items,
  renderItem,
  loadMore,
  hasMore,
  height = '70vh',
  loader,
}) {
  return (
    <div
      id="scrollableDiv"
      className="px-4"
      style={{ height, overflow: 'auto' }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center space-x-2 my-8 w-full">
            <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce" style={{animationDelay: '0ms'}} />
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" style={{animationDelay: '300ms'}} />
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce" style={{animationDelay: '600ms'}} />
            <div className="w-3 h-3 rounded-full bg-green-600 animate-bounce" style={{animationDelay: '900ms'}} />
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce" style={{animationDelay: '1200ms'}} />
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        <ul className="flex flex-col space-y-6 max-w-md mx-auto">
          {items.map(renderItem)}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

function Dot({ color, delay }) {
    return (
      <span
        className={`${color} text-5xl font-bold select-none inline-block`}
        style={{
          animation: 'dot-blink 1.5s ease-in-out infinite',
          animationDelay: `${delay}ms`,
          userSelect: 'none',
          lineHeight: 1,
          opacity: 0.8, // стартова стойност - за fallback
        }}
      >
        .
      </span>
    );
  }

