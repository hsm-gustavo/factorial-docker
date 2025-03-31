import { writeFile, readFile } from "fs/promises"
import { resolve } from "path"

const FILE_PATH = resolve("./data/fatoriais.txt")

function factorial(n: number): number | string {
  if (n < 0) return "Fatorial não definido para números negativos"
  if (n === 0 || n === 1) return 1
  return n * (factorial(n - 1) as number)
}

async function saveResult(n: number, res: number) {
  let data = ""
  try {
    data = await readFile(FILE_PATH, "utf-8")
  } catch {
    // se nao existir arquivo, será criado
  }
  const newEntry = `${n}! = ${res}\n`
  await writeFile(FILE_PATH, data + newEntry)
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log("Uso: node dist/index.js <número>")
    return
  }

  const num = parseInt(args[0], 10)
  if (isNaN(num)) {
    console.log("Por favor, forneça um número válido.")
    return
  }

  const result = factorial(num) as number
  await saveResult(num, result)
  console.log(`Fatorial de ${num} é ${result}`)
}

main()