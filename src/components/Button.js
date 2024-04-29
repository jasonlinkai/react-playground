import { useThemeContext } from "../contexts/ThemeContext"

export const Button = () => {
  const { theme, setPageColor } = useThemeContext();
  console.log('Button rerendered!');
  return (
    <button
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        color: theme === 'light' ? '#333333' : '#ffffff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
      }}
      onClick={() => setPageColor('ye')}
    >
      Toggle Theme
    </button>
  );
};