import { kebabCase } from "element-plus/lib/utils";
import { defineStore } from "pinia";
import axios from "../../axios";
import useLoginManagerStore from "../LoginManagerStore";

const useBProgramStore = defineStore('BProgramStore', {
  state: () => ({
    getData:{
      programTypeData: [],
      programData: []
    },
    apiUrl:{
      baseProgramUrl: 'http://127.0.0.1:8000/api/broadcastprogram/',
      getProgramTypeUrl: 'view_program_type/',
      getProgramUrl: 'view_program/',
      postProgramUrl: 'add_program/',
      putProgramUrl: 'update_program/',
      deleteProgramUrl: 'delete_program/',
      fileUploadUrl: 'file_upload/',
    },
    dialogSetting: {
      visable: false,
      addEditChange: false,
      contentTypeText: false,
      contentTypeFile: false,
      program_uuid: '',
      program_type_uuid: '',
      program_type: '',
      program_type_ch: '',
      program_name: '',
      program_content_type: '',
      program_content_text: '',
      program_content_file: new FormData(),
      uploadFileList: String['']
    }
  }),
  getters: {},
  actions: {
    dialogClear: function () {
      this.dialogSetting.program_uuid = ''
      this.dialogSetting.program_type_uuid = ''
      this.dialogSetting.program_type = ''
      this.dialogSetting.program_type_ch = ''
      this.dialogSetting.program_name = ''
      this.dialogSetting.program_content_type = ''
      this.dialogSetting.program_content_text = ''
      this.dialogSetting.program_content_file = new FormData()
      this.dialogSetting.uploadFileList = String['']
    },
    contentTypeSelect: function () {
      if (this.dialogSetting.program_content_type == 'Text'){
        this.dialogSetting.program_content_text = ''
        this.dialogSetting.program_content_file = new FormData()
        this.dialogSetting.contentTypeText = true
        this.dialogSetting.contentTypeFile = false
      }else{
        this.dialogSetting.program_content_text = ''
        this.dialogSetting.program_content_file = new FormData()
        this.dialogSetting.contentTypeText = false
        this.dialogSetting.contentTypeFile = true
      }
    },
    dialogAddOpen: function () {
      this.getProgramType({getcount:0})
      this.dialogClear()
      this.dialogSetting.contentTypeText = false
        this.dialogSetting.contentTypeFile = false
      this.dialogSetting.visable = true
      this.dialogSetting.addEditChange = false
    },
    dialogEditOpen: function (payload: { data: object }) {
      this.getProgramType({getcount:0})
      this.dialogClear()
      this.dialogSetting.program_uuid = payload.data['uuid']
      this.dialogSetting.program_type_uuid = payload.data['program_type_uuid']
      this.dialogSetting.program_type = payload.data['program_type']
      this.dialogSetting.program_type_ch = payload.data['program_type_ch']
      this.dialogSetting.program_name = payload.data['program_name']
      this.dialogSetting.program_content_type = payload.data['program_content_type']
      if (payload.data['program_content_type'] == 'Text'){
        this.dialogSetting.contentTypeText = true
        this.dialogSetting.contentTypeFile = false
        this.dialogSetting.program_content_text = payload.data['program_content_text']
      }else{
        this.dialogSetting.contentTypeText = false
        this.dialogSetting.contentTypeFile = true
        this.dialogSetting.program_content_text = payload.data['program_content_text']
        this.dialogSetting.uploadFileList = [{
          name: payload.data['program_content_file_name'],
          url:payload.data['program_content_file']
        }]
        const test = new Blob([payload.data['program_content_file']], {type: 'audio/mpeg'})
        this.dialogSetting.program_content_file.append('file', test, payload.data['program_content_file_name'])
        console.log(this.dialogSetting.program_content_file.get('file'))
      }
      this.dialogSetting.visable = true
      this.dialogSetting.addEditChange = true
    },
    getProgramType: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseProgramUrl + this.apiUrl.getProgramTypeUrl)
        .then(response => {
          console.log('get program type data')
          this.getData.programTypeData = response.data
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getProgramType({ getcount: payload.getcount + 1 })
            } else {
              this.getData.programTypeData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    getProgram: function (payload: { getcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.get(this.apiUrl.baseProgramUrl + this.apiUrl.getProgramUrl)
        .then(response => {
          console.log('get program data')
          this.getData.programData = response.data
          console.log(this.getData.programData)
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.getcount < 6) {
              loginManagerStore.refreshToken()
              this.getProgram({ getcount: payload.getcount + 1 })
            } else {
              this.getData.programData = []
              console.log('沒有權限')
            }
          } else {
            console.log(error)
          }
        })
    },
    addProgram: function (payload: { postcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.post(this.apiUrl.baseProgramUrl + this.apiUrl.postProgramUrl, 
        {
        data: {
          program_type_uuid: this.dialogSetting.program_type_uuid,
          program_name: this.dialogSetting.program_name,
          program_content_type: this.dialogSetting.program_content_type,
          program_content_text: this.dialogSetting.program_content_text,
          }
        }
      )
        .then(response => {
          console.log('post program data')
          this.getProgram({ getcount: 0 })
          if (this.dialogSetting.program_content_type == 'File'){
            this.dialogSetting.program_uuid = response.data
            this.fileUploadProgram({putcount:0})
          }
          this.dialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.postcount < 6) {
              loginManagerStore.refreshToken()
              this.addProgram({ postcount: payload.postcount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
    updateProgram: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseProgramUrl + this.dialogSetting.program_uuid + '/' + this.apiUrl.putProgramUrl, {
        data: {
          program_uuid: this.dialogSetting.program_uuid,
          program_type_uuid: this.dialogSetting.program_type_uuid,
          program_name: this.dialogSetting.program_name,
          program_content_type: this.dialogSetting.program_content_type,
          program_content_text: this.dialogSetting.program_content_text,
        }
      })
        .then(response => {
          console.log('put program data')
          this.getProgram({ getcount: 0 })
          if (this.dialogSetting.program_content_type == 'File'){
            this.fileUploadProgram({putcount:0})
          }
          this.dialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.updateProgram({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
    deleteProgram: function (payload: { deletecount: number, id: string }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseProgramUrl + payload.id + '/' + this.apiUrl.deleteProgramUrl, {
        data: {
          program_uuid: payload.id,
        }
      })
        .then(response => {
          console.log('delete program data')
          this.getProgram({ getcount: 0 })
          this.dialogClear()
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.deletecount < 6) {
              loginManagerStore.refreshToken()
              this.deleteProgram({ deletecount: payload.deletecount + 1, id: payload.id })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
    fileUploadProgram: function (payload: { putcount: number }) {
      const loginManagerStore = useLoginManagerStore();
      axios.put(this.apiUrl.baseProgramUrl + this.dialogSetting.program_uuid + '/' + this.apiUrl.fileUploadUrl, this.dialogSetting.program_content_file)
        .then(response => {
          console.log('put file data')
          this.getProgram({ getcount: 0 })
        })
        .catch(error => {
          if (error.response.status == '401' || error.response.status == '403') {
            if (payload.putcount < 6) {
              loginManagerStore.refreshToken()
              this.fileUploadProgram({ putcount: payload.putcount + 1 })
            } else {
              console.log('沒有權限')
              this.dialogClear()
            }
          } else {
            console.log(error)
            this.dialogClear()
          }
        })
    },
  }
})

export default useBProgramStore;