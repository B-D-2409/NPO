import InfiniteScroll from 'react-infinite-scroll-component';

export function InfiniteScrollWrapper({
    items,
    renderItem,
    loadMore,
    hasMore,
}) {
    return (
        <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
                <div className="flex justify-center items-center space-x-2 my-8 w-full">
                    <div className="w-3 h-3 rounded-full bg-white-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <div className="w-3 h-3 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '600ms' }} />
                    <div className="w-3 h-3 rounded-full bg-white-600 animate-bounce" style={{ animationDelay: '900ms' }} />
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '1200ms' }} />
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '1600ms' }} />
                </div>
            }
        >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
                {items.map(renderItem)}
            </ul>
        </InfiniteScroll>
    );
}
