import React, {useCallback, useRef} from 'react'

const UseAutoScrolling = ({isLoading ,isReachingEnd , fetchMore}) =>{
    const observer = useRef()

    const observerRef = useCallback(async (node) => {
        if (isLoading) return
        if (observer.current) {
            // @ts-ignore
            observer.current.disconnect()
        }
        // @ts-ignore
        observer.current = await new IntersectionObserver(entries => {
            if (entries[0].isIntersecting  && !isReachingEnd) {
                fetchMore()
            }
        })
        if (node) {
            // @ts-ignore
            observer.current.observe(node)
        }
    }, [isLoading , !isReachingEnd ])
    return{
        observerRef,
    }
}
export default UseAutoScrolling
