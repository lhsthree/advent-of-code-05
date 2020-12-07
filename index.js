const fs = require('fs')

const input = fs.readFileSync("./data.txt", "utf8").split("\n");

const splitCode = input.reduce(
  (s, a) => {
    s.push({
      row: a.slice(0, 7),
      column: a.slice(7) 
    })
    return s
  }, []
)
console.log(splitCode)

const checkRow = array => {
    let rowResultList = []
    array.forEach(pass => {
      let totalRows = [...Array(128).keys()]
      for (let i =0; i < pass.row.length; i++) {
        if (pass.row[i] === 'B') {
          totalRows.splice(0, totalRows.length / 2)
        } else if (pass.row[i] === 'F') {
          totalRows.splice(totalRows.length / 2, totalRows.length / 2)
        }
      }
      rowResultList.push(totalRows[0])
    })
      return rowResultList
}

const checkColumn = array => {
    let columnResultList = []
    array.forEach(pass => {
      let totalColumns = [...Array(8).keys()]
      for (let i =0; i < pass.column.length; i++) {
        if (pass.column[i] === 'R') {
          totalColumns.splice(0, totalColumns.length / 2)
        } else if (pass.column[i] === 'L') {
          totalColumns.splice(totalColumns.length / 2, totalColumns.length / 2)
        }
      }
      columnResultList.push(totalColumns[0])
    })
      return columnResultList
}

const checkSeats = (rowArray, columnArray) => {
  let seatList = []
  for (let i=0; i < rowArray.length; i++) {
    seatList.push({
      row: rowArray[i],
      column: columnArray[i],
      id: rowArray[i]*8 + columnArray[i]
    })
  }
  return seatList
}


const manifest = checkSeats(checkRow(splitCode), checkColumn(splitCode))

const maximumId = Math.max.apply(Math, manifest.map((pass) => pass.id ))

const manifestIds = manifest.map(seat => seat.id)
const sortedManifestIds = manifestIds.sort((a, b) => a - b)

const findMySeatId = sortedManifestIds.find((myId, i) => i < sortedManifestIds.length - 1 && sortedManifestIds[i + 1] - myId !== 1) + 1

console.log(`The maximum Id is: ${maximumId}`)
console.log(`My seat Id is: ${findMySeatId}`)