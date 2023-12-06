// const {checkCapacity,checkHouse,checkSection,checkFoodPreference,formStudentData} = require("./solution")

// test("checking the totalcapacity",
//     ()=>{
//         expect(checkCapacity(20)).toBe(true);
//         expect(checkCapacity(21)).toBe(false);
//     }
// )

// test("checkHouse",
//     ()=>{
//         expect(checkHouse("AV")).toBe(true);
//         expect(checkHouse("ANV")).toBe(true);
//         expect(checkHouse("AB")).toBe(false);
//         expect(checkHouse("BNV")).toBe(true);
//         expect(checkHouse("BBV")).toBe(false);
//     }
// )

// test("checkSection",
//     ()=>{
//         expect(checkSection("A")).toBe(true);
//         expect(checkSection("B")).toBe(true);
//         expect(checkSection("C")).toBe(false);
//     }
// )

// test("checkFoodPreference",()=>{
//     expect(checkFoodPreference("V")).toBe(true);
//     expect(checkFoodPreference("NV")).toBe(true);
//     expect(checkFoodPreference("N")).toBe(false);
// })

// test("solution Testcase1",()=>{
//     expect(formStudentData(["init 4","reg 1 A V","reg 2 A NV","reg 3 B V","reg 5 B NV","reg 4 A NV"])).toStrictEqual([[1],[2],[3],[5],[4]]);
//     expect(formStudentData(["init 4","reg 1 A VV","reg 2 A NV","reg 3 B V","reg 5 B NV","reg 4 A NV"])).toStrictEqual([[]]);
// }
// )

// test("solution testCase2",()=>{
//     expect(formStudentData(["init 8","reg 1 A V","reg 2 A NV","reg 3 B V","reg 5 B NV","reg 4 A NV","reg 6 B V","reg 7 A V","reg 8 B NV","reg 9 A V","reg 10 A NV"])).toStrictEqual([[1,7],[2,4],[3,6],[5,8],[9,10]]);
// })


const {
    isCapacityValid,
    isHouseValid,
    isSectionValid,
    isFoodPreferenceValid,
    processStudentData
} = require("./solution");

test("checking the total capacity", () => {
    expect(isCapacityValid(20)).toBe(true);
    expect(isCapacityValid(21)).toBe(false);
});

test("check house", () => {
    expect(isHouseValid("AV")).toBe(true);
    expect(isHouseValid("ANV")).toBe(true);
    expect(isHouseValid("AB")).toBe(false);
    expect(isHouseValid("BNV")).toBe(true);
    expect(isHouseValid("BBV")).toBe(false);
});

test("check section", () => {
    expect(isSectionValid("A")).toBe(true);
    expect(isSectionValid("B")).toBe(true);
    expect(isSectionValid("C")).toBe(false);
});

test("check food preference", () => {
    expect(isFoodPreferenceValid("V")).toBe(true);
    expect(isFoodPreferenceValid("NV")).toBe(true);
    expect(isFoodPreferenceValid("N")).toBe(false);
});

test("solution Testcase1", () => {
    expect(processStudentData(["init 4", "reg 1 A V", "reg 2 A NV", "reg 3 B V", "reg 5 B NV", "reg 4 A NV"])).toStrictEqual([[1], [2], [3], [5], [4]]);
    expect(processStudentData(["init 4", "reg 1 A VV", "reg 2 A NV", "reg 3 B V", "reg 5 B NV", "reg 4 A NV"])).toStrictEqual([[]]);
});

test("solution TestCase2", () => {
    expect(processStudentData(["init 8", "reg 1 A V", "reg 2 A NV", "reg 3 B V", "reg 5 B NV", "reg 4 A NV", "reg 6 B V", "reg 7 A V", "reg 8 B NV", "reg 9 A V", "reg 10 A NV"])).toStrictEqual([[1, 7], [2, 4], [3, 6], [5, 8], [9, 10]]);
});

