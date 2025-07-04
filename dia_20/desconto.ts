export function desconto(preco: number, porcentagem: number): number {
  return preco - preco * (porcentagem / 100);
}