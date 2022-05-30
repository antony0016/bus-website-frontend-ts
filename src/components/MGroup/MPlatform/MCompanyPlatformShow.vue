<template>
  <span>{{platformGetData.getPlatformData}}</span>
  <span>{{platformGetData.getEquipmentData}}</span>
  <el-form :model="platformGetData.getEquipmentData" label-position="left">
    <el-form-item label="設定 ETAG READER">
      <el-select v-model="selectData.selectPlatformEtag" filterable placeholder="請選擇">
        <el-option
          v-for="item in platformGetData.getEquipmentData['Etag']"
          :key="item['uuid']"
          :label="item['equipment_IP']"
          :value="item['uuid']">
        </el-option>
      </el-select>
      <el-select v-model="selectData.selectPlatformEtagAntenna" filterable placeholder="請選擇">
        <el-option
          v-for="item in testAntenna"
          :key="item['value']"
          :label="item['name']"
          :value="item['value']">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="設定人潮計數器">
      <el-select v-model="selectData.selectPlatformPeopleCount" filterable placeholder="請選擇">
        <el-option
          v-for="item in platformGetData.getEquipmentData['People_Count']"
          :key="item['uuid']"
          :label="item['equipment_IP']"
          :value="item['uuid']">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="設定人潮計數器帳密">
      帳號<el-input v-model="selectData.selectPlatformPeopleCountAccount" autocomplete="off"/>
      密碼<el-input v-model="selectData.selectPlatformPeopleCountPassword" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="設定雷射感應裝置">
      <el-select v-model="selectData.selectPlatformLaser" filterable placeholder="請選擇">
        <el-option
          v-for="item in platformGetData.getEquipmentData['Laser']"
          :key="item['uuid']"
          :label="item['equipment_IP']"
          :value="item['uuid']">
        </el-option>
      </el-select>
      <el-select v-model="selectData.selectPlatformDirection" filterable placeholder="請選擇">
        <el-option
          v-for="item in testDirection"
          :key="item['value']"
          :label="item['name']"
          :value="item['value']">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="設定 IP CAM">
      <el-select v-model="selectData.selectPlatformCamera" filterable placeholder="請選擇">
        <el-option
          v-for="item in platformGetData.getEquipmentData['Camera']"
          :key="item['uuid']"
          :label="item['equipment_IP']"
          :value="item['uuid']">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="設定 IP CAM 帳密">
      帳號<el-input v-model="selectData.selectPlatformCameraAccount" autocomplete="off"/>
      密碼<el-input v-model="selectData.selectPlatformCameraPassword" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="設定導影看板">
      <el-select v-model="selectData.selectPlatformGuidePlate" filterable placeholder="請選擇">
        <el-option
          v-for="item in platformGetData.getEquipmentData['Guide_Plate']"
          :key="item['uuid']"
          :label="item['equipment_IP']"
          :value="item['uuid']">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="選擇客運業者">
      <el-select v-model="selectData.selectPlatformCompany" filterable placeholder="請選擇" @change="getSelectRoute({getcount:0}); selectData.selectPlatformRoute=''">
        <el-option
          v-for="item in getData.getCompanyData"
          :key="item['company_uuid']"
          :label="item['company_name']"
          :value="item['company_uuid']">
        </el-option>
      </el-select>
      <el-select v-model="selectData.selectPlatformRoute" filterable placeholder="請選擇">
        <el-option
          v-for="item in platformGetData.getCompanyRouteData"
          :key="item['route_uuid']"
          :label="item['route_name']"
          :value="item['route_uuid']">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, watch } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import usePlatformStore from "../../../store/MGroup/MPlatformStore";
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";

const PlatformStore = usePlatformStore();
const { platformGetData, selectData } = storeToRefs(PlatformStore);
const { getSelectRoute } = PlatformStore;

const MCompanyStore = useMCompanyStore();
const { getData } = storeToRefs(MCompanyStore);
const { } = MCompanyStore;

const testAntenna = [
  {name: '天線1', value: 'antenna1'},
  {name: '天線2', value: 'antenna2'},
  {name: '天線3', value: 'antenna3'},
]

const testDirection = [
  {name: '方向1', value: 'direction1'},
  {name: '方向2', value: 'direction2'},
  {name: '方向3', value: 'direction3'},
]

</script>

<style scoped>

</style>
