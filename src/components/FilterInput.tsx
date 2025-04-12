type Props = {
  placeholder?: string;
  value: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FilterInput({
  placeholder,
  value,
  onChangeHandler,
}: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
      className="mb-2 p-2 border rounded min-w-64 "
    />
  );
}
