import { DickPattern, DickSizes } from './constants'
// Это JSDOC коментарий, очень полезная штука для документирования кода
/**
 * Проверка длины челена
 * @param dick {string} - член ввиде строки
 * @return {string} - Коментарий длене челена
 */
export const checkDickSize = (dick) => {
  if (typeof dick !== 'string' || !DickPattern.test(dick)) {
    return 'Looks like is not DICK'
  }
  const dickSize = dick.slice(1, -1).length

  if (dickSize >= 12) {
    return DickSizes.normal
  }
  if (dickSize < 12) {
    return DickSizes.small
  }
}
