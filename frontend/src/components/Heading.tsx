interface HeadingProps {
    label: string;
}

export function Heading({ label }: HeadingProps) {
    return <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {label}
    </h2>
}