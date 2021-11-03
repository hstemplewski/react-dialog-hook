import { renderHook, act } from "@testing-library/react-hooks";
import { useDialog } from "../use-dialog";

describe("use-dialog", () => {
  test("open/close dialog with params and results", async () => {
    const dialogInstance = renderHook(() => useDialog());
    const MOCKED_PARAMS = { key: "param" };
    const MOCKED_RESULT = { key: "result" };
    // OPEN
    act(() => {
      dialogInstance.result.current.open(MOCKED_PARAMS);
    });
    expect(dialogInstance.result.current.isOpen).toBe(true);
    expect(dialogInstance.result.current.params).toEqual(MOCKED_PARAMS);
    expect(dialogInstance.result.current.results).toBe(null);
    // CLOSE
    act(() => {
      dialogInstance.result.current.close(MOCKED_RESULT);
    });
    expect(dialogInstance.result.current.isOpen).toBe(false);
    expect(dialogInstance.result.current.results).toEqual(MOCKED_RESULT);
    expect(dialogInstance.result.current.params).toBe(null);
  });

  test("open/close dialog without params and results", async () => {
    const dialogInstance = renderHook(() => useDialog());

    // OPEN
    act(() => {
      dialogInstance.result.current.open();
    });
    expect(dialogInstance.result.current.isOpen).toBe(true);
    expect(dialogInstance.result.current.params).toBe(null);
    expect(dialogInstance.result.current.results).toBe(null);
    // CLOSE
    act(() => {
      dialogInstance.result.current.close();
    });
    expect(dialogInstance.result.current.isOpen).toBe(false);
    expect(dialogInstance.result.current.results).toBe(null);
    expect(dialogInstance.result.current.params).toBe(null);
  });
});

test("default open dialog", () => {
  const dialogInstance = renderHook(() => useDialog({ isDefaultOpen: true }));

  expect(dialogInstance.result.current.isOpen).toBe(true);
});

test("open method return results after close", async () => {
  const dialogInstance = renderHook(() => useDialog());

  await act(async () => {
    setTimeout(() => {
      // close dialog after 1000 to get results without breaking await
      dialogInstance.result.current.close("RESULTS");
    }, 1000);

    const result = await dialogInstance.result.current.open();

    expect(result).toEqual("RESULTS");
  });
});
