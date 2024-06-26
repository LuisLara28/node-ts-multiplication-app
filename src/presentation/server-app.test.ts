import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe("Server App", () => {
	const options = {
		base: 2,
		limit: 10,
		showTable: false,
		destination: "test-destination",
		name: "test-filename",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("should create ServerApp instance", () => {
		const serverApp = new ServerApp();

		expect(serverApp).toBeInstanceOf(ServerApp);
		expect(typeof ServerApp.run).toBe("function");
	});

	test("should run serverApp with options", () => {
		// const logSpy = jest.spyOn(console, "log");
		// const createTableSpy = jest.spyOn(
		// 	CreateTable.prototype,
		// 	"execute"
		// );
		// const saveTableSpy = jest.spyOn(SaveFile.prototype, "execute");
		// ServerApp.run(options);
		// expect(logSpy).toHaveBeenCalledTimes(3);
		// expect(logSpy).toHaveBeenCalledWith("Server running...");
		// expect(logSpy).toHaveBeenCalledWith("File Created!");
		// expect(createTableSpy).toHaveBeenCalledTimes(1);
		// expect(createTableSpy).toHaveBeenCalledWith({
		// 	base: options.base,
		// 	limit: options.limit,
		// });
		// expect(saveTableSpy).toHaveBeenCalledTimes(1);
		// expect(saveTableSpy).toHaveBeenCalledWith({
		// 	fileContent: expect.any(String),
		// 	fileDestination: options.destination,
		// 	fileName: options.name,
		// });
	});

	test("should run with custom values mocked", () => {
		const logMock = jest.fn();
		const logErrorMock = jest.fn();
		const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
		const saveFileMock = jest.fn().mockReturnValue(true);

		console.log = logMock;
		console.error = logErrorMock;
		CreateTable.prototype.execute = createMock;
		SaveFile.prototype.execute = saveFileMock;

		ServerApp.run(options);

		expect(logMock).toHaveBeenCalledWith("Server running...");
		expect(createMock).toHaveBeenCalledWith({ base: 2, limit: 10 });
		expect(saveFileMock).toHaveBeenCalledWith({
			fileContent: "1 x 2 = 2",
			fileDestination: options.destination,
			fileName: options.name,
		});
		expect(logMock).toHaveBeenCalledWith("File Created!");
		expect(logErrorMock).not.toHaveBeenCalledWith();
	});
});
