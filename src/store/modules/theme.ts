import { createSlice } from '@reduxjs/toolkit'
import { defaultTheme, IDefaultTheme } from '../../../config/defaultTheme'
import { extractLabelsAndKeys, getFirstLevelMenu, IRoute, MenuRoute } from '@/routes'
import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice'

interface IThemeState extends IDefaultTheme {
  firstLevelMenu: MenuRoute[]
  menuRoutes: MenuRoute[]
  realMenu: IRoute[]
}

interface IThemeAction extends SliceCaseReducers<IThemeState> {
  setThemeColor: (state: IThemeState, action: { payload: string }) => void
  setMenuMode: (state: IThemeState, action: { payload: string }) => void
  setRealMenu: (state: IThemeState, action: { payload: IRoute[] }) => void
  setMenuRoutes: (state: IThemeState) => void
  setFirstLevelMenu: (state: IThemeState) => void
  setPublicKey: (state: IThemeState, action: { payload: string }) => void
}

const theme = createSlice<IThemeState, IThemeAction, string>({
  name: 'todos',
  initialState: {
    ...defaultTheme,
    firstLevelMenu: [],
    menuRoutes: []
  },
  reducers: {
    setThemeColor(state, action) {
      state.themeColor = action.payload
    },
    setPublicKey(state, action) {
      state.publicKey = action.payload
    },
    setMenuMode(state, action) {
      state.menuMode = action.payload
    },
    setRealMenu(state, action) {
      state.realMenu = action.payload
    },
    setMenuRoutes(state) {
      state.menuRoutes = extractLabelsAndKeys(state.realMenu)
    },
    setFirstLevelMenu(state) {
      state.firstLevelMenu = getFirstLevelMenu(state.realMenu)
    }
  }
})

export const { setThemeColor, setMenuMode, setRealMenu, setMenuRoutes, setFirstLevelMenu, setPublicKey } = theme.actions
export default theme
