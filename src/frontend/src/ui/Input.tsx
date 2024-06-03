interface InputProps {
  type: string;
  placeholder?: string;
  props: any;
}

const Input: React.FC<InputProps> = ({ type = "text", placeholder = "" }) => {
  return (
    <>
      <input type={type} placeholder={placeholder} />
    </>
  );
};
export default Input;
