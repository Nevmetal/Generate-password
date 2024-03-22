import { useState } from "react";
import backstyle from "../styles/background.module.css";
export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [options, setOptions] = useState({
    includeNumbers: true,
    includeLetters: true,
    includeSpecialChars: true,
  });
  const handleInputChange = (event) => {
    const length = parseInt(event.target.value);
    if (!isNaN(length)) {
      setPasswordLength(length);
    }
  };
  const toggleOption = (option) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  const generatePassword = () => {
    const charset = generateCharset();
    if (charset.length === 0) {
      alert("Es requerido incluir como mínimo un tipo de caracter para generar la contraseña");
      return;
    }
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  };
  const generateCharset = () => {
    let charset = "";
    if (options.includeLetters) {
      charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (options.includeNumbers) {
      charset += "0123456789";
    }
    if (options.includeSpecialChars) {
      charset += "!@#$%^&*()_+";
    }
    return charset;
  };
  return (
    <main className={`${backstyle.cssselector} h-screen grid content-center `}>
      <article className="m-auto mt-2  max-w-3xl p-6 rounded-lg bg-gray-800 border-gray-700 shadow-violet-500 shadow-2xl">
        <div className="flex content-center">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl text-white text-center ">
            Generador de Contraseñas
          </h1>
        </div>

        <label className="text-2xl italic">Longitud de la contraseña:</label>
        <div className="grid gap-6 grid-cols-3 content-center p-2 mb-2 ">
          <input
            className="col-span-2 rounded-lg cursor-pointer bg-gray-700"
            type="range"
            defaultValue={passwordLength}
            onChange={handleInputChange}
            min="1"
            max="128"
          />
          <span>{passwordLength}</span>
        </div>
        <div>
          <input
            type="checkbox"
            id="includeNumbers"
            checked={options.includeNumbers}
            onChange={() => toggleOption("includeNumbers")}
          />
          <label htmlFor="includeNumbers">Incluir números</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="includeLetters"
            checked={options.includeLetters}
            onChange={() => toggleOption("includeLetters")}
          />
          <label htmlFor="includeLetters">Incluir letras</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="includeSpecialChars"
            checked={options.includeSpecialChars}
            onChange={() => toggleOption("includeSpecialChars")}
          />
          <label htmlFor="includeSpecialChars">
            Incluir caracteres especiales
          </label>
        </div>
        <textarea
          className="block p-3 w-full text-sm md:h-20 bg-gray-50 rounded-lg border  dark:bg-gray-700 border-gray-600  text-white text-balance "
          defaultValue={password}
          disabled
        ></textarea>
        <button
          className="text-white mt-2 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
          onClick={generatePassword}
        >
          Generar Contraseña
        </button>
      </article>
    </main>
  );
}
