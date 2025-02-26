
interface ButtonProps{
    label : string;
    type : string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({label, onClick} : ButtonProps) {
    return <button onClick={onClick} type="button" className="flex w-full justify-center rounded-md
    bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
     hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-indigo-600">{label}</button>
}