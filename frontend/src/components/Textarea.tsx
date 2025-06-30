interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ label, value, onChange }: Props) => {
  return (
    <div className="mt-4">
      <label className="block mb-1 font-medium">{label}</label>
      <textarea
        className="border w-full p-2 rounded"
        rows={4}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
