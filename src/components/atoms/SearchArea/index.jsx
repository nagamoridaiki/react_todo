import style from './style.module.css'

export const SearchArea = (props) => {
  const {searchKeyWord, placeholder, onChangeSetSearchKeyWord, handleKeyDown} = props

  return (
    <input
      className={style.input}
      type="text"
      placeholder={placeholder}
      onChange={onChangeSetSearchKeyWord}
      value={searchKeyWord}
      onKeyDown={handleKeyDown}
    />
  )
}
