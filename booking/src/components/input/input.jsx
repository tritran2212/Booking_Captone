import { useId } from "react";
export function Input({
        type="text",
        placeholder="Entertext",
        required,
        ...restInput
}) {
    const id = useId();
    return (
        <div>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...restInput}
                className={`py-2 px-3 text-black border-b border-neutral-300 focus:border-fuchsia-800 focus:outline-none focus:shadow-[0_1px_0_0_#8a0194] rounded-none transition duration-200 ${required ? " pr-6" : ""}`}
            />
            {required && (
                <span>(*)</span>
            )}
        </div>
    );
}
