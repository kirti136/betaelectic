interface Props {
  label: string;
  onClick: () => void;
  color?: string;
}

const Button = ({ label, onClick, color = "blue" }: Props) => {
  const bg = color === "red" ? "bg-red-600" : "bg-blue-600";
  return (
    <button
      onClick={onClick}
      className={`${bg} text-white px-4 py-2 rounded hover:opacity-90`}
    >
      {label}
    </button>
  );
};

export default Button;
