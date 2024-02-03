import DBService from "../src/services/dbService";
import { db } from "../src/db";
import { mockValues } from "./mockValues";

describe("db service", () => {
  const dbService = new DBService(db);

  beforeEach(() => {
    dbService.clear();
  });

  it("should return empty value", () => {
    expect(dbService.get()).toEqual([]);
  });

  it("should create entity", () => {
    dbService.create(mockValues.createModel);

    expect(dbService.get().length).toBe(1);
  });

  it("should delete entity", () => {
    const result = dbService.create(mockValues.createModel);
    dbService.delete(result.id);

    expect(dbService.get().length).toBe(0);
  });

  it("should update entity", () => {
    const result = dbService.create(mockValues.createModel);
    const updatedEntity = dbService.update(result.id, mockValues.updateModel);

    expect(updatedEntity).toEqual({ ...result, ...mockValues.updateModel });
  });

  it("should clear db data", () => {
    dbService.create(mockValues.createModel);

    expect(dbService.get().length).toBe(1);

    dbService.clear();

    expect(dbService.get().length).toBe(0);
  });
});
