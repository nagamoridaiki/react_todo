import style from './style.module.css'

export const SearchArea = (props) => {
  const { role, searchKeyWord, placeholder, onChangeSetSearchKeyWord, handleKeyDown} = props

  return (
    <input
      role={role}
      className={style.input}
      type="text"
      placeholder={placeholder}
      onChange={onChangeSetSearchKeyWord}
      value={searchKeyWord}
      onKeyDown={handleKeyDown}
    />
  )
}
