import { PlayerStoreModel } from "./PlayerStore"

test("can be created", () => {
  const instance = PlayerStoreModel.create({})

  expect(instance).toBeTruthy()
})
