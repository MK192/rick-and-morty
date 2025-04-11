type Props = {
  labelText: string;
  setFunction: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  height?: string;
  type?: "text" | "password" | "email";
};

export default function TextInput({
  labelText,
  setFunction,
  width = "w-full",
  height = "h-full",
  type = "text",
}: Props) {
  return (
    <div className={`flex flex-col ${width}`}>
      <label className="font-semibold flex flex-col">
        {labelText}
        <input
          type={type}
          autoComplete="on"
          className={`rounded bg-blue-200 px-2 ${height}`}
          onChange={(e) => setFunction(e.target.value)}
        />
      </label>
    </div>
  );
}
