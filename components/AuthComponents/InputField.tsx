const InputField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = true,
  className = "",
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}) => (
  <div className={`mb-6 ${className}`}>
    <label
      htmlFor={id}
      className="block text-gray-800 font-semibold mb-2 select-none"
    >
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition placeholder-gray-400 text-gray-900 shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
      placeholder={label}
      aria-required={required}
      aria-describedby={`${id}-help`}
    />
  </div>
);

export default InputField;
