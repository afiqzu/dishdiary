import { leapfrog } from "ldrs";

export const LoadingSpinner = () => {
    leapfrog.register();
    return (
        <l-leapfrog
            size="80"
            speed="2.5"
            color="#FF6201"
        ></l-leapfrog>
    );
};