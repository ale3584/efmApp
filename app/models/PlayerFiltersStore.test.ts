import { PlayerFiltersStoreModel } from "./PlayerFiltersStore"

test("can be created", () => {
  const instance = PlayerFiltersStoreModel.create({})

  expect(instance).toBeTruthy()
})
