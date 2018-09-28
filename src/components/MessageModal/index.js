/**
 *
Modal.info
Modal.success
Modal.error
Modal.warning
Modal.confirm
 * 
 */
import { Modal } from 'antd'
const msgmodal = (type, title, message) => {
  const modal = Modal[type]({
    title: title,
    content: message
  })
  setTimeout(() => modal.destroy(), 3000)
}
export default msgmodal
