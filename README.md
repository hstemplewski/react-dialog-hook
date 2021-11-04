# React dialog hook

This hook was made to manage dialog state in React. Main feature is possibility to get results passed as argument of `close` method as returned value from `open` dialog method. See [example](#example). _It's fully written in Typescript._

## Usage

### Installing

```sh
npm install git+https://github.com/hstemplewski/react-dialog-hook.git
```

### Importing

```typescript
import { useDialog } from "react-dialog-hook";
```

### Example

```typescript
import { useDialog } from "react-hook-dialog";

function Example() {
  const {
    isOpen
    open
    close
    params
  } = useDialog<ParamsType>({
    isDefaultOpen: false; // Set dialog open after first render
  });

  const openHandler = useCallback(async () => {
    const results = await open(); // It returns results passed as argument to close method
  }, []);

  return (
    <>
    <Button onClick={openHandler}>OPEN DIALOG</Button>
    <Dialog isOpen={isOpen} close={close} params={params} />
    </>
  )
}
```

## Config

| Key           | Default | Description                                                       |
| ------------- | :-----: | ----------------------------------------------------------------- |
| isDefaultOpen | `false` | Allows to open dialog on first render without user's ingerention. |

## Bugs reporting

To report bug connected with lib, please open new issue, assign one if the [authors](#authors) into it and add `bug` label.

## Contributing

If you have any idea how to improve this lib, please fork this repo, suggest changes, make a PR and add one of the authors as a reviewer. Don't forget to add proper description of this feature/bugfix.

# Authors ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/hstemplewski"><img src="https://avatars.githubusercontent.com/u/25898331?s=460&u=a1489c65ba165f83cdbca99778f224882ea7cdff&v=4" width="100px;" alt=""/><br /><sub><b>Hubert Stemplewski</b></sub></a></td>
    <td align="center"><a href="https://github.com/benedyktdryl"><img src="https://avatars.githubusercontent.com/u/576068?s=400&u=60be2bede95aad024ead28cfc91ece157ec51f70&v=4" width="100px;" alt=""/><br /><sub><b>Benedykt Dryl</b></sub></a></td>
    <td align="center"><a href="https://github.com/witoldmetel"><img src="https://avatars.githubusercontent.com/u/31034370?v=4" width="100px;" alt=""/><br /><sub><b>Witold Mętel</b></sub></a></td>
  </tr>
</table>
