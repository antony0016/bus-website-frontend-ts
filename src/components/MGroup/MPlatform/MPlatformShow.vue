<template>
  <el-form :model="platformGetData.getEquipmentData" label-position="left" :label-width="formLabelWidth">
    <el-form-item label="月台選擇">
      <el-select v-model="selectData.selectNowPlatform" filterable placeholder="請選擇" @change="selectPlatform()">
        <el-option
          v-for="item in platformGetData.getPlatformData"
          :key="item['uuid']"
          :label="item['platform_name']"
          :value="item['uuid']">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="設定 IP CAM" :label-width="formLabelWidth">
      <el-select v-model="DetailPlatformData.Camera" filterable placeholder="請選擇" @change="changeCamera()" :disabled="disableControl.choiceEquipment">
        <el-option
          v-for="item in platformGetData.getEquipmentData['Camera']"
          :key="item['uuid']"
          :label="item['equipment_name']"
          :value="item['uuid']"
          :disabled="item['disable']">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="設定 IP CAM 帳密" :label-width="formLabelWidth">
      帳號<el-input v-model="selectData.selectPlatformCameraAccount" autocomplete="off" :disabled="disableControl.choiceEquipment"/>
      密碼<el-input v-model="selectData.selectPlatformCameraPassword" type="password" autocomplete="off" :disabled="disableControl.choiceEquipment"/>
    </el-form-item>
    
    <el-form-item label="選擇客運業者" :label-width="formLabelWidth">
      <el-select v-model="selectData.selectPlatformCompany" filterable placeholder="請選擇" @change="getSelectRoute({getcount:0}); selectData.selectPlatformRoute=''" :disabled="disableControl.choiceEquipment">
        <el-option
          v-for="item in getData.getCompanyData"
          :key="item['company_uuid']"
          :label="item['company_name']"
          :value="item['company_uuid']">
        </el-option>
      </el-select>
      <el-select v-model="selectData.selectPlatformRoute" filterable placeholder="請選擇" :disabled="disableControl.choiceEquipment">
        <el-option
          v-for="item in platformGetData.getCompanyRouteData"
          :key="item['route_uuid']"
          :label="item['route_name']"
          :value="item['route_uuid']">
        </el-option>
      </el-select>
      <el-button
        type="primary"
        :disabled="disableControl.choiceEquipment"
        @click="addPlatformRoute()"
      >
        新增
      </el-button>
    </el-form-item>
    <el-table
      :data="DetailPlatformData.routes"
      style="width: 100%"
      :default-sort = "{prop: 'id', order: 'ascending'}">
      <el-table-column
        prop="id"
        label="ID"
        width="180"
        sortable>
        <template #default="{row,$index}">
          <span style="margin-left: 10px">{{row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="route_name"
        label="路線名稱"
        width="180"
        sortable>
        <template #default="{row,$index}">
          <span style="margin-left: 10px">{{row.route_name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template #default="{row,$index}">
          <el-button
            type="danger"
            @click="deletePlatformRoute({data: row})"
          >
            刪除
          </el-button>
        </template>
      </el-table-column> 
    </el-table>
    <el-button
      type="primary"
      @click="submitPlatformData({putcount:0})"
    >
      儲存
    </el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, watch } from 'vue'
import { storeToRefs } from "pinia";
import { ElMessageBox } from 'element-plus'
import usePlatformStore from "../../../store/MGroup/MPlatformStore";
import useMCompanyStore from "../../../store/MGroup/MCompanyStore";

const PlatformStore = usePlatformStore();
const { platformGetData, DetailPlatformData, selectData, disableControl, loadingShow } = storeToRefs(PlatformStore);
const { getSelectRoute, selectPlatform, addPlatformRoute, deletePlatformRoute, submitPlatformData, changeCamera } = PlatformStore;

const MCompanyStore = useMCompanyStore();
const { getData } = storeToRefs(MCompanyStore);
const { } = MCompanyStore;

const formLabelWidth = '150px'

</script>

<style scoped>

</style>
