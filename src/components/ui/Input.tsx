interface Props {
  placeholder: string;
  type?: string;
}

function Input({ placeholder, type = "text" }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-12 rounded-lg border border-gray-300 px-4 text-base focus:border-indigo-600 focus:outline-none"
    />
  );
}

export default Input;