import useConfigStore from "@renderer/store/useConfigStore"
import { DataTypes } from "@renderer/types"
import { ElMessage, ElMessageBox } from "element-plus"
import { ref } from "vue"

export default () => {
    const newValue = ref('')
    const { config } = useConfigStore()
    const addValidate = (type: DataTypes) => {
        let message = ''
        switch (type) {
            case 'size':
                if (!/^\d+x\d+$/.test(newValue.value)) message = '分辨率格式错误';
                break;
            case 'frame':
                if (!/^\d+$/.test(newValue.value)) message = '帧率格式错误';
                break;
            default:
                break;
        }
        if (message) ElMessage({ message, type: 'error', grouping: true })
        return message === ''
    }
    const add = (type: DataTypes) => {
        if (!addValidate(type)) return
        config[type === 'size' ? 'sizes' : 'frames'].push(newValue.value)
        ElMessage({ message: '添加成功', type: 'success', grouping: true })
        newValue.value = ''
    }
    const remove = async (type: DataTypes, index: number) => {
        // await ElMessageBox.confirm('确定删除吗？')
        ElMessage({ message: "删除成功", type: "warning", grouping: true })
        switch (type) {
            case 'size':
                config.sizes.splice(index, 1);
                break;
            case 'frame':
                config.frames.splice(index, 1);
                break;
            default:
                break;
        }
    }
    return {
        newValue,
        add,
        remove
    }
}