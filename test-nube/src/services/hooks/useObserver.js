import { useEffect, useState } from "react";

export default function useObserver({ elementRef }) {

    const [intersects, setIntersects] = useState(false);

    useEffect(() => {
        if (!elementRef.current) return;
        function onView(entries, observer) {
            const element = entries[0];
            if (element.isIntersecting) {
                setIntersects((prev) => true);
            } else {
                setIntersects((prev) => false);
            }
        }
        const observer = new IntersectionObserver(onView, {
            rootMargin: "500px",
        });
        observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, []);

    return { intersects, setIntersects };
}