import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useCEquipmentStore = defineStore('CEquipmentStore', {
  state: () => ({
    equipmentSelect: 'Camera',
    selectItem: [
      { type_id: '', type_name: '', type_ch_name: '' },
    ],
    dialogVisible: {
      equipmentDialogFormVisable: false,
      selectDisable: false
    },
    apiUrl: {
      baseEquipmentUrl: 'http://127.0.0.1:8000/api/equipment/',
      getEquipmentUrl: 'view_equipment/',
      getEquipmentTypeUrl: 'view_equipment_type_name/',
      postEquipment: 'add_equipment/',
      putEquipment: 'update_equipment/',
      deleteEquipment: 'delete_equipment/',
      basePlatformUrl: 'http://127.0.0.1:8000/api/platform/',
      getPlatformUrl: 'view_platform/',
    },
    getData: {
      equipmentData: {},
      filterEquipmentData: [],
      platformData: [{uuid: 'null', platform_name: '無設定'}]
    },
    equipmentDialogFormData: {
      equipment_uuid: '',
      equipment_no: '',
      equipment_name: '',
      equipment_IP: '',
      equipment_state: '',
      equipment_type: '',
      equipment_account: '',
      equipment_password: '',
      belong_platform: '',
    },
  }),
  getters: {},
  actions: {
    equipmentDialogClear: function (){
      this.equipmentDialogFormData.equipment_uuid = ''
      this.equipmentDialogFormData.equipment_no = ''
      this.equipmentDialogFormData.equipment_name = ''
      this.equipmentDialogFormData.equipment_IP = ''
      this.equipmentDialogFormData.equipment_state = ''
      this.equipmentDialogFormData.equipment_type = ''
      this.equipmentDialogFormData.equipment_account = ''
      this.equipmentDialogFormData.equipment_password = ''
      this.equipmentDialogFormData.belong_platform = ''
    },
    equipmentDialogAdd: function (){
      this.getPlatform({getcount:0})
      this.dialogVisible.selectDisable = false
      this.dialogVisible.equipmentDialogFormVisable = true
    },
    equipmentDialogUpdate: function (payload: { data: object }){
      this.getPlatform({getcount:0})
      this.equipmentDialogFormData.equipment_uuid = payload.data['uuid']
      this.equipmentDialogFormData.equipment_no = payload.data['equipment_no']
      this.equipmentDialogFormData.equipment_name = payload.data['equipment_name']
      this.equipmentDialogFormData.equipment_IP = payload.data['equipment_IP']
      this.equipmentDialogFormData.equipment_state = payload.data['equipment_state']
      this.equipmentDialogFormData.equipment_type = payload.data['equipment_type_id']
      this.equipmentDialogFormData.equipment_account = payload.data['equipment_account']
      this.equipmentDialogFormData.belong_platform = payload.data['belong_platform_uuid']
      this.equipmentDialogFormData.equipment_password = ''
      this.dialogVisible.selectDisable = true
      this.dialogVisible.equipmentDialogFormVisable = true
    },
    getEquipment: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseEquipmentUrl + this.apiUrl.getEquipmentUrl)
        .then(response => {
          console.log('get equipment data')
          this.getData.equipmentData = response.data
          this.filterEquipment()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getEquipment({ getcount: payload.getcount + 1 })
            } else {
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getEquipmentType: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseEquipmentUrl + this.apiUrl.getEquipmentTypeUrl)
        .then(response => {
          console.log('get equipment type data')
          this.selectItem = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getEquipmentType({ getcount: payload.getcount + 1 })
            } else {
              this.selectItem = [
                { type_id: '', type_name: '', type_ch_name: '' }
              ]
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getPlatform: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.basePlatformUrl + this.apiUrl.getPlatformUrl)
        .then(response => {
          console.log('get platform data')
          this.getData.platformData = [{uuid: 'null', platform_name: '無設定'}]
          for (let v of response.data){
            this.getData.platformData.push(v)
          }
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getPlatform({ getcount: payload.getcount + 1 })
            } else {
              this.getData.platformData = [{uuid: 'null', platform_name: '無設定'}]
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    postEquipment: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();    
      axios.post(this.apiUrl.baseEquipmentUrl + this.apiUrl.postEquipment, {
        data: {
          equipment_no: this.equipmentDialogFormData.equipment_no,
          equipment_name: this.equipmentDialogFormData.equipment_name,
          equipment_IP: this.equipmentDialogFormData.equipment_IP,
          equipment_state: this.equipmentDialogFormData.equipment_state,
          belong_equipmentType: this.equipmentDialogFormData.equipment_type,
          equipment_account: this.equipmentDialogFormData.equipment_account,
          equipment_password: this.equipmentDialogFormData.equipment_password,
          belong_platform: this.equipmentDialogFormData.belong_platform,
        }
      })
        .then(response => {
          console.log('post equipment data')
          this.getEquipment({ getcount: 0 })
          this.equipmentDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.postEquipment({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.equipmentDialogClear()
            }
          } else {
            console.log(error)
            this.equipmentDialogClear()
          }
        })
    },
    putEquipment: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseEquipmentUrl + this.equipmentDialogFormData.equipment_uuid + '/' + this.apiUrl.putEquipment, {
        data: {
          equipment_uuid: this.equipmentDialogFormData.equipment_uuid,
          equipment_no: this.equipmentDialogFormData.equipment_no,
          equipment_name: this.equipmentDialogFormData.equipment_name,
          equipment_IP: this.equipmentDialogFormData.equipment_IP,
          equipment_state: this.equipmentDialogFormData.equipment_state,
          belong_equipmentType: this.equipmentDialogFormData.equipment_type,
          equipment_account: this.equipmentDialogFormData.equipment_account,
          equipment_password: this.equipmentDialogFormData.equipment_password,
          belong_platform: this.equipmentDialogFormData.belong_platform,
        }
      })
        .then(response => {
          console.log('put equipment data')
          this.getEquipment({ getcount: 0 })
          this.equipmentDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.putEquipment({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.equipmentDialogClear()
            }
          } else {
            console.log(error)
            this.equipmentDialogClear()
          }
        })
    },
    deleteEquipment: function (payload: { deletecount: number, id: string }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseEquipmentUrl + payload.id + '/' + this.apiUrl.deleteEquipment, {
        data: {
          equipment_uuid: payload.id,
        }
      })
        .then(response => {
          console.log('delete equipment data')
          this.getEquipment({ getcount: 0 })
          this.equipmentDialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteEquipment({ deletecount: payload.deletecount + 1, id: payload.id })
            } else {
              console.log('沒有權限')
              this.equipmentDialogClear()
            }
          } else {
            console.log(error)
            this.equipmentDialogClear()
          }
        })
    },
    filterEquipment: function () {
      this.getData.filterEquipmentData = this.getData.equipmentData[this.equipmentSelect]
      console.log(this.getData.filterEquipmentData)
    },
    changeSelectPlatform: function () {
      if (this.equipmentDialogFormData.belong_platform == 'null'){
        this.equipmentDialogFormData.equipment_state = '未連接'
      }else{
        this.equipmentDialogFormData.equipment_state = '連接中'
      }
    }
  }
})

export default useCEquipmentStore;