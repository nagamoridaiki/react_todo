import style from './style.module.css'
import { SearchArea } from '../../atoms/SearchArea'

export const AddTodo = (props) => {
  const {addInputValue, onChangeAddTodo, handleAddTodo} = props

  return (
    <>
      <h2 className={style.subTitle}>{"ADD TODO"}</h2>
      <SearchArea
        searchKeyWord={addInputValue}
        placeholder={"New Todo"}
        onChangeSetSearchKeyWord={onChangeAddTodo}
        handleKeyDown={handleAddTodo}
      />
    </>
  )
}