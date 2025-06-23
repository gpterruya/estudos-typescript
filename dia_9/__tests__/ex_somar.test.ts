import { CalculadoraSimples } from "../dia_9";

test("soma dois números", () => {
  const calc = new CalculadoraSimples();
  expect(calc.somar(5, 7)).toBe(12);
});