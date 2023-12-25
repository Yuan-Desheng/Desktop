<template>
    <div class="outputpdf-body" v-loading="loading">
			<div class="ctn">
            <div class="pdf-ctn">
                <div class="pdf-panel">
					<!--	首页	-->
					<div class="a4main" style="page-break-after:always;">>
						<div class="title">SEW智能监测系统</div>
						<div class="title">设备运行报告</div>
						<div class="table">
							<div class="tr">
								<div class="td">企业名称</div>
								<div class="td" id="companyName"></div>
							</div>
							<div class="tr">
								<div class="td">运行周期</div>
								<div class="td" id="runCycle"></div>
							</div>
							<div class="tr">
								<div class="td">报告</div>
								<div class="td" id="a4Report"></div>
							</div>
							<div class="tr">
								<div class="td">日期</div>
								<div class="td" id="a4Date"></div>
							</div>
						</div>
					</div>
					<!--	声明页面	-->
					<div class="statement" style="page-break-after:always;">>
						<div class="title">
							声明
						</div>
						<div class="content">
							本报告由SEW-传动设备（天津）有限公司提供，版权归SEW所有，未经SEW书面许可，请勿将本报告提供 给任何第三方或发布于公共信息平台。报告中所有结论基于贵我双方确认的参数及运行工况（详见“监测设 备运行参数”）给出，如数据与实际存在偏差，或工况发生变化，将影响本监测报告的准确性。本报告结论 仅供参考，不作为决策依据。如有任何疑问请及时与SEW联系。
						</div>
						<div class="title title2">
							STATEMENT
						</div>
						<div class="content content2">
							This report is provided by SEW-EURODRIVE (Tianjin) Co., Ltd., and the copyright belongs to SEW-EURODRIVE. Please do not provide the report to third party or publish it on public information platform without
							written permission. All conclusions in the report are based on parameters and operating conditions mutually confirmed (refer to “Operating parameters of the monitored equipment” for details). If the data deviates from the actual conditions or the operating condition changes, it will affect the accuracy of the report. The conclusions of this report is only for reference and shall not be deemed as decision basis.Please contact SEW-EURODRIVE if you have any questions.
						</div>
					</div>
					
                    <!-- 设备信息汇总 -->
                    <div id="deviceInfos" class="allInfo" style="page-break-after:always;">>
                        <h3 style="color: black">一.设备信息汇总</h3>
                        <table class="deviceInfos-table" v-for="(item,index) in runningReportData.deviceInfos" :key="item.id">
                            <thead>
                            <tr>
                                <th colspan="2" style="font-weight: 500;">{{ index+"-"+item.name+"-"+item.faultLevel }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="basics-tr">
                                <td>S/N</td>
                                <td>{{item.sn}}}</td>
                            </tr>
                            <tr class="basics-tr">
                                <td>型号</td>
                                <td>{{ item.model }}</td>
                            </tr>
                            <tr class="basics-tr">
                                <td>现场使用环境</td>
                                <td>{{ item.workingEnvironment }}</td>
                            </tr>
                            <tr class="basics-tr">
                                <td>减速机速比</td>
                                <td>{{ item.ratio }}</td>
                            </tr>
                            <tr class="basics-tr">
                                <td>电机转速(rpm)</td>
                                <td>{{ item.rpm }}</td>
                            </tr>
                            <tr class="basics-tr">
                                <td>减速机工作状态</td>
                                <td>{{ item.workingStatus }}</td>
                            </tr>
                            <tr class="basics-tr">
                                <td>减速机运行速度</td>
                                <td>{{ item.frequencyDesc }}</td>
                            </tr>
                            <tr class="basics-tr">
                                <td>减速机负载类型</td>
                                <td>{{ item.loadType }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

					<!-- 分页 -->
					<div class="page-skip"></div>

					<!-- 设备监测详情 -->
					<div id="detection" style="page-break-after:always;">>
						<h3 style="color: black">二.设备监测详情</h3>
						<div class="detection" v-for="(item,index) in runningReportData.monitorDetails" :key="item.deviceId">
							<table :key="item.deviceId">
								<thead>
									<tr class="detection-tr">
										<th colspan="2">{{ index + 1 +". "+item.deviceName }}</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="(e, i) in item.monitors">
										<template v-for="(m, n) in e.series">
											<tr class="detection-tr">
												<td class="tdTit">{{ m.monitorName }}</td>
											</tr>
											<tr class="detection-tr">
												<td class="tdTit">
													<div class="itemEcharts descriptions-echarts" :ref="'monit' + index + i + n" style="page-break-inside: avoid;"></div>
												</td>
											</tr>
										</template>
									</template>
									<tr class="detection-tr">
										<td class="tdTit">润滑油时间</td>
									</tr>
									<tr class="detection-tr">
										<td>
											<div class="itemTxt">
												<div class="txtItem">最新换油时间: {{ item.oilTime.nowTime }}</div>
												<div class="txtItem">运行时间: {{ item.oilTime.runTime }}小时</div>
												<div class="txtItem">上次换油: {{ item.oilTime.lastOilChangeTime }}</div>
												<div class="txtItem">距离下次换油时间: {{ item.oilTime.nextOilChangeTime }}小时</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<!-- 分页 -->
					<div class="page-skip"></div>

					<!-- 历史报警信息 -->
					<div id="historical" style="page-break-after:always;">>
						<h3 style="color: black">三.历史报警信息</h3>
						<div class="historical historical-table-div" v-for="(item,index) in runningReportData.historicalAlarmInfo" :key="item.id">
							<table :key="item.id">
								<thead>
									<tr>
										<th colspan="2">{{ index + 1 +". "+item.deviceName }}</th>
									</tr>
								</thead>
								<tbody>
									<tr class="basics-tr">
										<td>告警序号</td>
										<td>{{ index + 1 }}</td>
									</tr>
									<tr class="basics-tr">
										<td>监测名称</td>
										<td>{{ item.monitorName + item.monitorItemName }}</td>
									</tr>
									<tr class="basics-tr">
										<td>告警状态</td>
										<td>{{ item.monitorstatus }}</td>
									</tr>
									<tr class="basics-tr">
										<td>告警时间</td>
										<td>{{ item.alarmTime }}</td>
									</tr>
									<tr class="basics-tr">
										<td>解除时间</td>
										<td>{{ item.cancelTime }}</td>
									</tr>
									<tr class="basics-tr">
										<td>告警次数</td>
										<td>{{ item.alarmCount }}</td>
									</tr>
									<tr>
										<td class="tdTit">
											<div class="itemEcharts descriptions-echarts" :ref="'history' + index" style="page-break-inside: avoid;"></div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
                </div>
            </div>
        </div>
		<!-- 工具栏 -->
		<div class="navigation">
			<el-button type="primary" @click="handleOutput" v-loading="handleOutputLoading">下 载</el-button>
		</div>
		<!-- 页眉 -->
		<div class="pdf-header"
					style="position: fixed; top: -100vh;">
			<div class="headerCon">
				<h1 class="headerTitle">
					SEW 智能监测系统设备运行报告
				</h1>
				<img class="sewpng" :src="sewpng" style="width: 10.52vw;height: 4.687vw;"></img>
			</div>
			<div class="pageNum">
				Page : <div class="pdf-footer-page">2</div> / <div class="pdf-footer-page-count"></div>
			</div>
		</div>
		<!-- 页脚 -->
		<div class="pdf-footer"
			style="font-weight: bold; padding: 15px 8px; width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.85); position: fixed; top: -100vh;">
			<div style="display: flex; justify-content: center; align-items: center; padding-top: 5px;">
				我是页尾
			</div>
			<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
				第<div class="pdf-footer-page"></div>页 / 第<div class="pdf-footer-page-count"></div>页
			</div>
		</div>
    </div>
</template>

<script>
import {outputPDF} from "../utils/outputPDF";
import sewpng from "../assets/UAV.png"
import * as echarts from 'echarts';

export default {
	name: "outputPDF",
	// props: {
	// 	runningReportParams: {
	// 		type: Object,
	// 		default: () => {
	// 		}
	// 	}
	// },
	data() {
		return {
		  loading: true,
			handleOutputLoading: false,
		  runningReportData: null,
      sewpng: sewpng,
		}
	},
	created() {
		// console.log(this.runningReportParams, "runningReportParams");
		console.log(this.$route.query, "this.$route.query");
		this.getRunningReportData(this.$route.query);
	},
	mounted() {
        console.log(111111111111111111111)
        this.$nextTick(() => {
            const a4main = document.querySelector('.a4main');
            a4main.querySelector('#companyName').innerText = this.runningReportData.deptName;
            a4main.querySelector('#runCycle').innerText = this.runningReportData.periodic;
            a4main.querySelector('#a4Report').innerText = this.runningReportData.userName;
            a4main.querySelector('#a4Date').innerText = this.runningReportData.date;
            var refsArr = [];
            for(let index = 0; index < this.runningReportData.monitorDetails.length; index++) {
                for(let i = 0; i < this.runningReportData.monitorDetails[index].monitors.length; i++) {
                    for(let n = 0; n < this.runningReportData.monitorDetails[index].monitors[i].series.length; n++) {
                        refsArr[ 'monit' + index + i + n ] = echarts.init(this.$refs['monit' + index + i + n][0]);
                        refsArr[ 'monit' + index + i + n ].setOption({
                            legend: {
                                // Try 'horizontal'
                                orient: 'vertical',
                                right: 0,
                                // icon: 'path://M 0 50 h 10',
                                data: [ this.runningReportData.monitorDetails[index].monitors[i].series[n].name ]
                            },
                            grid: {
                                x: 80,
                                y: 30,
                                x2: 30,
                                y2: 30
                            },
                            xAxis: {
                                type: 'category',
                                data: this.runningReportData.monitorDetails[index].monitors[i].times
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    name: this.runningReportData.monitorDetails[index].monitors[i].series[n].name,
                                    data: this.runningReportData.monitorDetails[index].monitors[i].series[n].data,
                                    type: 'line',
                                    showSymbol: 'false',
                                    symbolSize: 0,
                                    lineStyle: {
                                        normal: {
                                            color: 'green'
                                        }
                                    }
                                }
                            ]
                        });
                    }
                }
            }
            for(let index = 0; index < this.runningReportData.historicalAlarmInfo.length; index++) {
                refsArr[ 'history' + index ] = echarts.init(this.$refs['history' + index][0]);
                var timestamps = this.runningReportData.historicalAlarmInfo[index].monitorValues.data.map(item => item.timestamp);
                var values = this.runningReportData.historicalAlarmInfo[index].monitorValues.data.map(item => item.value);
                refsArr[ 'history' + index ].setOption({
                    grid: {
                        x: 80,
                        y: 30,
                        x2: 80,
                        y2: 30
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: timestamps
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: values,
                            type: 'line',
                            showSymbol: 'false',
                            symbolSize: 0,
                        },
                        {
                            type: 'custom',
                            renderItem: (param, api)=>{
                                let bandWidth = api.size([0, 0])[0] * (timestamps.length); // data为总数据量
                                let itemWidth = api.size([0, 0])[0]
                                let point = api.coord([api.value(0), api.value(1)]);
                                return {
                                    type: 'line',
                                    transition: ['shape'],
                                    shape: {
                                        x1: point[0] - itemWidth*0.5,
                                        x2: point[0] + bandWidth - itemWidth*0.5,
                                        y1: point[1],
                                        y2: point[1]
                                    },
                                    style: api.style({ // 直线配置
                                        fill: null,
                                        stroke: api.visual('color'),
                                        lineWidth: 2 // 线宽
                                    })
                                };
                            },
                            encode: {
                                x: 0,
                                y: 1
                            },
                            color: 'red',
                            data: [this.runningReportData.historicalAlarmInfo[index].monitorValues.alarmValue],
                            label: {
                                show: false,
                            },
                        },
                        {
                            type: 'custom',
                            renderItem: (param, api)=>{
                                let bandWidth = api.size([0, 0])[0] * (timestamps.length); // data为总数据量
                                let itemWidth = api.size([0, 0])[0]
                                let point = api.coord([api.value(0), api.value(1)]);
                                return {
                                    type: 'line',
                                    transition: ['shape'],
                                    shape: {
                                        x1: point[0] - itemWidth*0.5,
                                        x2: point[0] + bandWidth - itemWidth*0.5,
                                        y1: point[1],
                                        y2: point[1]
                                    },
                                    style: api.style({ // 直线配置
                                        fill: null,
                                        stroke: api.visual('color'),
                                        lineWidth: 2 // 线宽
                                    })
                                };
                            },
                            encode: {
                                x: 0,
                                y: 1
                            },
                            color: '#ffea00',
                            data: [this.runningReportData.historicalAlarmInfo[index].monitorValues.earlyWarningValue],
                            label: {
                                show: false,
                            },
                        },
                    ],
                    markLine: {
                        symbol: ['none', 'none'],//去掉箭头
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: ['red', 'yellow']
                                },
                                label: {
                                    show: false
                                }
                            }
                        },
                        data: [
                            {
                                yAxis: this.runningReportData.historicalAlarmInfo[index].monitorValues.alarmValue,
                            },
                            {
                                yAxis: this.runningReportData.historicalAlarmInfo[index].monitorValues.earlyWarningValue
                            }
                        ]
                    }
                })
            }
        })
	},
    methods: {
      // 获取运行报告数据
      getRunningReportData(params) {
		this.runningReportData = {
        "deptName": "01号岸桥",
        "periodic": "2023-12-08 08:38:51~2023-12-15 08:38:51",
        "userName": "admin",
        "date": "2023-12-19 13:38:25",
        "mapStatus": {
            "6a15bc64-c124-4f62-9c91-d75a0c7d22f9": "正常",
            "8a0760b5-2691-4e05-bb1e-ff2fa581c2c4": "报警",
            "6fa39cbc-7c56-4dd6-a02b-2089ccf085e9": "正常",
            "d06098c3-b882-4a76-bf39-f5ba7405ec99": "正常",
            "a8effa79-b759-4edf-8616-bd40cbb0ff53": "正常",
            "741fa913-3c0d-4d3d-bc33-32734155a67a": "正常",
            "f023575a-4086-4a09-a5b2-527b5fb255ee": "正常",
            "f71f9ab3-19dd-44c1-abf3-bae9839ee1d9": "报警",
            "e13561f9-962e-40ca-8914-63cd71e5c484": "正常",
            "7c8558b9-95a4-4055-9ef4-8e01eb5f7339": "正常",
            "fec70969-7813-4ad4-b223-3569781c237f": "正常",
            "b9d36592-796a-47d5-85fe-2559923454f0": "正常",
            "b866122a-62eb-45ee-9e87-0df798d24bf2": "正常",
            "6e820eaa-baf2-44ed-87c8-c714f81bb587": "正常",
            "d02dbbb0-eefb-4c8b-813f-750a75fdbc5a": "正常",
            "92465e95-0007-4492-8ade-b9b13b5bc5f0": "正常",
            "8794bb72-19c8-4af6-8443-4974022d53ac": "正常",
            "6efdb96e-04bc-438f-9e65-d0eafb92ef2d": "报警",
            "ae2b804c-ae5c-4da6-906c-f444c2bf72ee": "报警",
            "f820813a-643d-409d-a26c-e0a48fc2dae5": "正常",
            "8efa4a7d-43b4-4c84-8869-e365a0cac4dd": "正常",
            "4096ffa1-fc64-4d65-8dce-fe83a8405524": "报警",
            "721f4e89-d2f2-4a97-9d67-6e9265fd318f": "正常",
            "8ad58d08-3f67-423c-9705-af10bf5ad950": "正常",
            "d41b9041-8784-4634-a89c-ae76ce5eddd4": "正常",
            "5c77f1b2-9e94-4f1f-85c5-97be0e201100": "报警",
            "5a8f91f6-99b9-4072-841f-cd76bfa0d220": "正常",
            "26a21278-77f7-44d4-bfb7-126152dc3c46": "正常"
        },
        "deviceInfos": [
            {
                "id": "26a21278-77f7-44d4-bfb7-126152dc3c46",
                "sn": "sss",
                "name": "aaa",
                "model": "aaa",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1000",
                "workingStatus": "",
                "frequencyDesc": "变频（连续变速）",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "4096ffa1-fc64-4d65-8dce-fe83a8405524",
                "sn": "2",
                "name": "2",
                "model": "2",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "5a8f91f6-99b9-4072-841f-cd76bfa0d220",
                "sn": "M010004333",
                "name": "振华减速机FH1060.27.A2B-00",
                "model": "振华减速机FH1060.27.A2B-00",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "5c77f1b2-9e94-4f1f-85c5-97be0e201100",
                "sn": "M0666666",
                "name": "M0666666",
                "model": "M0666666",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1200",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "6a15bc64-c124-4f62-9c91-d75a0c7d22f9",
                "sn": "M4444444",
                "name": "M4444444",
                "model": "M4444444",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 1,
                "detail": ""
            },
            {
                "id": "6e820eaa-baf2-44ed-87c8-c714f81bb587",
                "sn": "M01000556",
                "name": "老化2",
                "model": "老化2",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 1,
                "detail": ""
            },
            {
                "id": "6efdb96e-04bc-438f-9e65-d0eafb92ef2d",
                "sn": "test222",
                "name": "test222",
                "model": "test222",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1000",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "6fa39cbc-7c56-4dd6-a02b-2089ccf085e9",
                "sn": "1",
                "name": "1",
                "model": "1",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "变频（有稳定速度）",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "721f4e89-d2f2-4a97-9d67-6e9265fd318f",
                "sn": "peach",
                "name": "BigPeach",
                "model": "fruit",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "741fa913-3c0d-4d3d-bc33-32734155a67a",
                "sn": "M11111111111",
                "name": "M11111111111",
                "model": "M11111111111",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1200",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "7c8558b9-95a4-4055-9ef4-8e01eb5f7339",
                "sn": "32",
                "name": "3",
                "model": "3",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "8794bb72-19c8-4af6-8443-4974022d53ac",
                "sn": "ceshi",
                "name": "ceshi",
                "model": "ceshi",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "8a0760b5-2691-4e05-bb1e-ff2fa581c2c4",
                "sn": "M0166666",
                "name": "M0166666",
                "model": "M0166666",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "8ad58d08-3f67-423c-9705-af10bf5ad950",
                "sn": "test1111",
                "name": "test1111",
                "model": "test1111",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "8efa4a7d-43b4-4c84-8869-e365a0cac4dd",
                "sn": "M01000996",
                "name": "老化4",
                "model": "老化4",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1200",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "92465e95-0007-4492-8ade-b9b13b5bc5f0",
                "sn": "M01000991",
                "name": "老化1",
                "model": "老化1",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "a8effa79-b759-4edf-8616-bd40cbb0ff53",
                "sn": "M03",
                "name": "03号减速机",
                "model": "03号减速机",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1333",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "ae2b804c-ae5c-4da6-906c-f444c2bf72ee",
                "sn": "M888999",
                "name": "M888999",
                "model": "M888999",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 2,
                "detail": ""
            },
            {
                "id": "b866122a-62eb-45ee-9e87-0df798d24bf2",
                "sn": "GZ1",
                "name": "故障1",
                "model": "故障1",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1200",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "b9d36592-796a-47d5-85fe-2559923454f0",
                "sn": "GZ4",
                "name": "故障4",
                "model": "故障4",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "d02dbbb0-eefb-4c8b-813f-750a75fdbc5a",
                "sn": "m333333",
                "name": "m333333",
                "model": "m333333",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1500",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "d06098c3-b882-4a76-bf39-f5ba7405ec99",
                "sn": "6666666666666666",
                "name": "886",
                "model": "6666666666666666666",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "d41b9041-8784-4634-a89c-ae76ce5eddd4",
                "sn": "GZ2",
                "name": "故障2",
                "model": "故障2",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "9600",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "e13561f9-962e-40ca-8914-63cd71e5c484",
                "sn": "888888",
                "name": "8888888888",
                "model": "88888888888888888",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "f023575a-4086-4a09-a5b2-527b5fb255ee",
                "sn": "6",
                "name": "6",
                "model": "6",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "f71f9ab3-19dd-44c1-abf3-bae9839ee1d9",
                "sn": "GZ3",
                "name": "故障3",
                "model": "故障3",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "0",
                "workingStatus": "",
                "frequencyDesc": "恒速",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "f820813a-643d-409d-a26c-e0a48fc2dae5",
                "sn": "cccc",
                "name": "cccc",
                "model": "cccc",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1200",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            },
            {
                "id": "fec70969-7813-4ad4-b223-3569781c237f",
                "sn": "M666666",
                "name": "M666666",
                "model": "M666666",
                "workingEnvironment": "",
                "ratio": "",
                "rpm": "1200",
                "workingStatus": "",
                "frequencyDesc": "",
                "loadType": "",
                "faultLevel": 0,
                "detail": ""
            }
        ],
        "monitorDetails": [
            {
                "deviceId": "6a15bc64-c124-4f62-9c91-d75a0c7d22f9",
                "deviceName": "M4444444",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [
                            "2023-12-08 08:49:15",
                            "2023-12-08 09:08:54",
                            "2023-12-08 09:24:02",
                            "2023-12-08 09:39:08",
                            "2023-12-08 09:54:17",
                            "2023-12-08 10:09:28",
                            "2023-12-08 10:24:53",
                            "2023-12-08 10:40:02",
                            "2023-12-08 10:55:12",
                            "2023-12-08 11:10:24",
                            "2023-12-08 11:25:32",
                            "2023-12-08 11:40:41",
                            "2023-12-08 11:55:52",
                            "2023-12-08 12:11:06",
                            "2023-12-08 12:26:12",
                            "2023-12-08 12:41:21",
                            "2023-12-08 12:56:36",
                            "2023-12-08 13:11:40",
                            "2023-12-08 13:26:47",
                            "2023-12-08 13:41:53",
                            "2023-12-08 13:57:00",
                            "2023-12-08 14:12:10",
                            "2023-12-08 14:27:24",
                            "2023-12-08 14:42:37",
                            "2023-12-08 14:57:49",
                            "2023-12-08 15:12:58",
                            "2023-12-08 15:28:01",
                            "2023-12-08 15:43:06",
                            "2023-12-08 15:58:10",
                            "2023-12-08 16:13:17",
                            "2023-12-08 16:28:24",
                            "2023-12-08 16:43:32",
                            "2023-12-08 16:58:37",
                            "2023-12-09 08:19:10",
                            "2023-12-09 08:34:07",
                            "2023-12-09 08:48:57",
                            "2023-12-09 09:03:51",
                            "2023-12-09 09:18:50",
                            "2023-12-09 09:33:45",
                            "2023-12-09 09:48:39",
                            "2023-12-09 10:03:49",
                            "2023-12-09 10:18:49",
                            "2023-12-09 10:33:49",
                            "2023-12-09 10:48:47",
                            "2023-12-09 11:03:44",
                            "2023-12-09 11:18:46",
                            "2023-12-09 11:33:38",
                            "2023-12-09 11:48:35",
                            "2023-12-09 12:03:28",
                            "2023-12-09 12:18:24",
                            "2023-12-09 12:33:17",
                            "2023-12-09 12:48:17",
                            "2023-12-09 13:03:16",
                            "2023-12-09 13:18:16",
                            "2023-12-09 13:33:16",
                            "2023-12-09 13:48:16",
                            "2023-12-09 14:03:19",
                            "2023-12-09 14:18:14",
                            "2023-12-09 14:33:10",
                            "2023-12-09 14:48:03",
                            "2023-12-09 15:02:57",
                            "2023-12-09 15:17:50",
                            "2023-12-09 15:32:40",
                            "2023-12-09 15:47:33",
                            "2023-12-09 16:02:38",
                            "2023-12-09 16:17:28",
                            "2023-12-09 16:32:24",
                            "2023-12-09 16:47:15",
                            "2023-12-09 17:02:05",
                            "2023-12-11 13:33:58",
                            "2023-12-11 13:49:08",
                            "2023-12-11 14:04:17",
                            "2023-12-11 14:19:28",
                            "2023-12-11 14:34:37",
                            "2023-12-11 14:49:47",
                            "2023-12-11 15:04:57",
                            "2023-12-11 15:20:07",
                            "2023-12-11 15:35:19",
                            "2023-12-11 15:50:32",
                            "2023-12-11 16:05:42",
                            "2023-12-11 16:20:54",
                            "2023-12-11 16:36:08",
                            "2023-12-11 16:51:21",
                            "2023-12-11 17:06:37",
                            "2023-12-12 07:39:22",
                            "2023-12-12 07:54:08",
                            "2023-12-12 08:09:03",
                            "2023-12-12 08:23:58",
                            "2023-12-12 08:38:50",
                            "2023-12-12 08:53:47",
                            "2023-12-12 09:08:38",
                            "2023-12-12 09:23:31",
                            "2023-12-12 09:38:23",
                            "2023-12-12 09:53:15",
                            "2023-12-12 10:08:24",
                            "2023-12-12 10:23:36",
                            "2023-12-12 10:38:42",
                            "2023-12-12 10:53:47",
                            "2023-12-12 11:08:47",
                            "2023-12-12 11:23:49",
                            "2023-12-12 11:38:50",
                            "2023-12-12 11:53:50",
                            "2023-12-12 12:08:49",
                            "2023-12-12 12:23:45",
                            "2023-12-12 12:38:38",
                            "2023-12-12 12:53:34",
                            "2023-12-12 13:08:28",
                            "2023-12-12 13:23:30",
                            "2023-12-12 13:38:31",
                            "2023-12-12 13:53:30",
                            "2023-12-12 14:08:27",
                            "2023-12-12 14:23:25",
                            "2023-12-12 14:38:28",
                            "2023-12-12 14:53:34",
                            "2023-12-12 15:08:32",
                            "2023-12-12 15:23:29",
                            "2023-12-12 15:38:38",
                            "2023-12-12 15:53:39",
                            "2023-12-12 16:08:40",
                            "2023-12-12 16:23:38",
                            "2023-12-12 16:38:42",
                            "2023-12-12 16:53:50",
                            "2023-12-12 17:09:02",
                            "2023-12-12 17:24:05",
                            "2023-12-13 07:54:21",
                            "2023-12-13 08:09:29",
                            "2023-12-13 08:24:28",
                            "2023-12-13 08:39:25",
                            "2023-12-13 08:54:30",
                            "2023-12-13 09:09:28",
                            "2023-12-13 09:24:23",
                            "2023-12-13 09:39:26",
                            "2023-12-13 09:54:21",
                            "2023-12-13 10:09:19",
                            "2023-12-13 10:24:30",
                            "2023-12-13 10:39:34",
                            "2023-12-13 10:54:37",
                            "2023-12-13 11:09:40",
                            "2023-12-13 11:24:57",
                            "2023-12-13 11:40:06",
                            "2023-12-13 11:55:09",
                            "2023-12-13 12:10:12",
                            "2023-12-13 12:25:13",
                            "2023-12-13 12:40:11",
                            "2023-12-13 12:55:13",
                            "2023-12-13 13:10:17",
                            "2023-12-13 13:25:15",
                            "2023-12-13 13:40:14",
                            "2023-12-13 13:55:17",
                            "2023-12-13 14:10:25",
                            "2023-12-13 14:25:27",
                            "2023-12-13 14:40:26",
                            "2023-12-13 14:55:25",
                            "2023-12-13 15:10:21",
                            "2023-12-13 15:25:22",
                            "2023-12-13 15:40:24",
                            "2023-12-13 15:55:22",
                            "2023-12-13 16:10:21",
                            "2023-12-13 16:25:22",
                            "2023-12-13 16:40:20",
                            "2023-12-13 16:55:22",
                            "2023-12-14 07:44:17",
                            "2023-12-14 07:59:16",
                            "2023-12-14 08:14:20",
                            "2023-12-14 08:29:15",
                            "2023-12-14 08:44:11",
                            "2023-12-14 08:59:07",
                            "2023-12-14 09:14:04",
                            "2023-12-14 09:28:58",
                            "2023-12-14 09:43:57",
                            "2023-12-14 09:58:58",
                            "2023-12-14 10:13:51",
                            "2023-12-14 10:28:52",
                            "2023-12-14 10:43:49",
                            "2023-12-14 10:58:48",
                            "2023-12-14 11:13:49",
                            "2023-12-14 11:28:49",
                            "2023-12-14 11:43:52",
                            "2023-12-14 11:59:00",
                            "2023-12-14 12:14:05",
                            "2023-12-14 12:29:09",
                            "2023-12-14 12:44:10",
                            "2023-12-14 12:59:16",
                            "2023-12-14 13:14:23",
                            "2023-12-14 13:29:19",
                            "2023-12-14 13:44:17",
                            "2023-12-14 13:59:25",
                            "2023-12-14 14:14:36",
                            "2023-12-14 14:29:40",
                            "2023-12-14 14:44:47",
                            "2023-12-14 14:59:53",
                            "2023-12-14 15:14:59",
                            "2023-12-14 15:30:06",
                            "2023-12-14 15:45:11",
                            "2023-12-14 16:00:28",
                            "2023-12-14 16:15:31",
                            "2023-12-15 08:04:11",
                            "2023-12-15 08:19:17",
                            "2023-12-15 08:34:20"
                        ],
                        "series": [
                            {
                                "name": "V1-速度振动总值",
                                "data": [
                                    0.009342300000000001,
                                    0.0089608,
                                    0.0089933,
                                    0.0090381,
                                    0.0087598,
                                    0.008666499999999999,
                                    0.0087405,
                                    0.008657,
                                    0.0087852,
                                    0.009002,
                                    0.0089074,
                                    0.0092583,
                                    0.0092,
                                    0.008859,
                                    0.0090808,
                                    0.008629,
                                    0.0085372,
                                    0.0089699,
                                    0.0093735,
                                    0.0091876,
                                    0.009111600000000001,
                                    0.009276900000000001,
                                    0.0086762,
                                    0.0087436,
                                    0.0084027,
                                    0.008685700000000001,
                                    0.0086334,
                                    0.008412600000000001,
                                    0.0082803,
                                    0.008450599999999999,
                                    0.008374900000000001,
                                    0.0081757,
                                    0.009926899999999999,
                                    0.0100257,
                                    0.0095324,
                                    0.009482899999999999,
                                    0.009480100000000002,
                                    0.0092018,
                                    0.0088065,
                                    0.008676399999999999,
                                    0.0086313,
                                    0.0084745,
                                    0.008518399999999999,
                                    0.0085445,
                                    0.0086322,
                                    0.0086007,
                                    0.008415200000000001,
                                    0.0087256,
                                    0.0085736,
                                    0.0086005,
                                    0.0093932,
                                    0.0082138,
                                    0.008404,
                                    0.0087872,
                                    0.0089704,
                                    0.0088661,
                                    0.008431,
                                    0.0084184,
                                    0.0083587,
                                    0.0084227,
                                    0.0086422,
                                    0.008469399999999998,
                                    0.0086889,
                                    0.0086128,
                                    0.008849300000000001,
                                    0.0091742,
                                    0.00931,
                                    0.009237800000000001,
                                    0.0088576,
                                    0.008999400000000001,
                                    0.0088072,
                                    0.008438,
                                    0.008474899999999999,
                                    0.0083693,
                                    0.0087427,
                                    0.0086662,
                                    0.0086464,
                                    0.0086821,
                                    0.0091842,
                                    0.0088775,
                                    0.0086944,
                                    0.0092167,
                                    0.0089047,
                                    0.010532,
                                    0.0112068,
                                    0.0104516,
                                    0.0105946,
                                    0.010120500000000001,
                                    0.0094998,
                                    0.0093313,
                                    0.009179,
                                    0.0091296,
                                    0.009858500000000001,
                                    0.0108521,
                                    0.011200499999999999,
                                    0.011569300000000001,
                                    0.0116664,
                                    0.0112835,
                                    0.009618,
                                    0.0096152,
                                    0.010415299999999999,
                                    0.0097518,
                                    0.009780500000000001,
                                    0.0104008,
                                    0.0105243,
                                    0.0093692,
                                    0.0102633,
                                    0.009862300000000001,
                                    0.0093554,
                                    0.0090627,
                                    0.009472999999999999,
                                    0.0092566,
                                    0.0088836,
                                    0.008305400000000001,
                                    0.0083176,
                                    0.0081482,
                                    0.0083351,
                                    0.009389100000000001,
                                    0.008414399999999999,
                                    0.009192,
                                    0.0089341,
                                    0.0089391,
                                    0.0089373,
                                    0.0106703,
                                    0.0117907,
                                    0.010531500000000001,
                                    0.0098828,
                                    0.0097569,
                                    0.0094429,
                                    0.009632100000000001,
                                    0.0099177,
                                    0.0093869,
                                    0.0092018,
                                    0.0090735,
                                    0.0094394,
                                    0.009329500000000001,
                                    0.0091978,
                                    0.0093362,
                                    0.0089068,
                                    0.0092624,
                                    0.0090174,
                                    0.0086509,
                                    0.0083837,
                                    0.008575099999999999,
                                    0.0084744,
                                    0.0083677,
                                    0.0086861,
                                    0.0085625,
                                    0.0085002,
                                    0.0087019,
                                    0.0086577,
                                    0.0086005,
                                    0.0082577,
                                    0.0083889,
                                    0.008298700000000001,
                                    0.0082838,
                                    0.0087243,
                                    0.0087026,
                                    0.008552,
                                    0.0082746,
                                    0.0097746,
                                    0.0104099,
                                    0.0099299,
                                    0.0095774,
                                    0.0091113,
                                    0.0088892,
                                    0.008862,
                                    0.0088993,
                                    0.010026,
                                    0.008767800000000001,
                                    0.0089626,
                                    0.0088375,
                                    0.0091944,
                                    0.0088837,
                                    0.008940100000000001,
                                    0.009161800000000001,
                                    0.0089031,
                                    0.0087312,
                                    0.0090085,
                                    0.0088438,
                                    0.009775299999999999,
                                    0.009156899999999999,
                                    0.008760500000000001,
                                    0.0088462,
                                    0.0088036,
                                    0.0091252,
                                    0.0090501,
                                    0.008902799999999999,
                                    0.0085672,
                                    0.008918800000000001,
                                    0.0102897,
                                    0.009961099999999999,
                                    0.0098047,
                                    0.0093685,
                                    0.0088514,
                                    0.0104822,
                                    0.0115178,
                                    0.0111038,
                                    0.010514333333333334
                                ],
                                "monitorName": "V1"
                            }
                        ]
                    },
                    {
                        "monitorItemType": 20001,
                        "times": [
                            "2023-12-08 08:50:46",
                            "2023-12-08 09:08:53",
                            "2023-12-08 09:24:01",
                            "2023-12-08 09:39:06",
                            "2023-12-08 09:54:16",
                            "2023-12-08 10:09:26",
                            "2023-12-08 10:24:52",
                            "2023-12-08 10:40:01",
                            "2023-12-08 10:55:11",
                            "2023-12-08 11:10:22",
                            "2023-12-08 12:12:37",
                            "2023-12-08 12:27:41",
                            "2023-12-08 12:47:33",
                            "2023-12-08 13:02:38",
                            "2023-12-08 13:17:42",
                            "2023-12-08 13:32:48",
                            "2023-12-08 13:49:23",
                            "2023-12-08 14:09:07",
                            "2023-12-08 14:30:27",
                            "2023-12-08 14:45:37",
                            "2023-12-08 15:14:28",
                            "2023-12-08 15:29:31",
                            "2023-12-08 15:44:36",
                            "2023-12-08 15:59:39",
                            "2023-12-09 08:14:37",
                            "2023-12-09 08:29:40",
                            "2023-12-09 08:44:30",
                            "2023-12-09 08:59:19",
                            "2023-12-09 09:14:19",
                            "2023-12-09 09:29:14",
                            "2023-12-09 09:44:09",
                            "2023-12-09 09:59:10",
                            "2023-12-09 10:14:20",
                            "2023-12-09 10:29:16",
                            "2023-12-09 10:44:15",
                            "2023-12-09 10:59:15",
                            "2023-12-09 11:14:13",
                            "2023-12-09 11:29:07",
                            "2023-12-09 11:44:04",
                            "2023-12-09 11:58:57",
                            "2023-12-09 12:13:54",
                            "2023-12-09 12:28:49",
                            "2023-12-09 12:43:47",
                            "2023-12-09 12:58:44",
                            "2023-12-09 13:13:45",
                            "2023-12-09 13:28:43",
                            "2023-12-09 13:43:45",
                            "2023-12-09 13:58:50",
                            "2023-12-09 14:13:44",
                            "2023-12-09 14:28:37",
                            "2023-12-09 14:43:32",
                            "2023-12-09 14:58:25",
                            "2023-12-09 15:13:21",
                            "2023-12-09 15:28:11",
                            "2023-12-09 15:43:03",
                            "2023-12-09 15:58:10",
                            "2023-12-09 16:12:59",
                            "2023-12-09 16:27:53",
                            "2023-12-09 16:42:46",
                            "2023-12-09 16:57:38",
                            "2023-12-11 13:29:22",
                            "2023-12-11 13:44:34",
                            "2023-12-11 13:59:43",
                            "2023-12-11 14:14:53",
                            "2023-12-11 14:30:03",
                            "2023-12-11 14:45:12",
                            "2023-12-11 15:00:21",
                            "2023-12-11 15:15:31",
                            "2023-12-11 15:30:43",
                            "2023-12-11 15:45:57",
                            "2023-12-11 16:01:07",
                            "2023-12-11 16:16:19",
                            "2023-12-11 16:31:34",
                            "2023-12-11 16:46:49",
                            "2023-12-11 17:02:02",
                            "2023-12-11 17:17:17",
                            "2023-12-12 07:49:37",
                            "2023-12-12 08:04:31",
                            "2023-12-12 08:19:29",
                            "2023-12-12 08:34:21",
                            "2023-12-12 08:49:17",
                            "2023-12-12 09:04:09",
                            "2023-12-12 09:19:02",
                            "2023-12-12 09:33:53",
                            "2023-12-12 09:48:45",
                            "2023-12-12 10:03:48",
                            "2023-12-12 10:18:57",
                            "2023-12-12 10:34:07",
                            "2023-12-12 10:49:15",
                            "2023-12-12 11:04:17",
                            "2023-12-12 11:19:16",
                            "2023-12-12 11:34:21",
                            "2023-12-12 11:49:20",
                            "2023-12-12 12:04:18",
                            "2023-12-12 12:19:14",
                            "2023-12-12 12:34:10",
                            "2023-12-12 12:49:04",
                            "2023-12-12 13:03:58",
                            "2023-12-12 13:18:56",
                            "2023-12-12 13:33:57",
                            "2023-12-12 13:48:58",
                            "2023-12-12 14:03:58",
                            "2023-12-12 14:18:57",
                            "2023-12-12 14:33:58",
                            "2023-12-12 14:48:59",
                            "2023-12-12 15:04:01",
                            "2023-12-12 15:19:00",
                            "2023-12-12 15:34:11",
                            "2023-12-12 15:49:07",
                            "2023-12-12 16:04:07",
                            "2023-12-12 16:19:07",
                            "2023-12-12 16:34:06",
                            "2023-12-12 16:49:15",
                            "2023-12-12 17:04:22",
                            "2023-12-12 17:19:35",
                            "2023-12-13 07:49:47",
                            "2023-12-13 08:04:57",
                            "2023-12-13 08:19:56",
                            "2023-12-13 08:34:55",
                            "2023-12-13 08:49:57",
                            "2023-12-13 09:04:56",
                            "2023-12-13 09:19:57",
                            "2023-12-13 09:34:52",
                            "2023-12-13 09:49:51",
                            "2023-12-13 10:04:49",
                            "2023-12-13 10:20:00",
                            "2023-12-13 10:35:02",
                            "2023-12-13 10:50:09",
                            "2023-12-13 11:05:05",
                            "2023-12-13 11:20:25",
                            "2023-12-13 11:35:30",
                            "2023-12-13 11:50:38",
                            "2023-12-13 12:05:37",
                            "2023-12-13 12:20:42",
                            "2023-12-13 12:35:39",
                            "2023-12-13 12:50:39",
                            "2023-12-13 13:05:43",
                            "2023-12-13 13:20:43",
                            "2023-12-13 13:35:45",
                            "2023-12-13 13:50:43",
                            "2023-12-13 14:05:51",
                            "2023-12-13 14:20:54",
                            "2023-12-13 14:35:53",
                            "2023-12-13 14:50:59",
                            "2023-12-13 15:05:51",
                            "2023-12-13 15:20:49",
                            "2023-12-13 15:35:51",
                            "2023-12-13 15:50:49",
                            "2023-12-13 16:05:47",
                            "2023-12-13 16:20:50",
                            "2023-12-13 16:37:20",
                            "2023-12-13 16:52:25",
                            "2023-12-14 07:41:13",
                            "2023-12-14 07:56:16",
                            "2023-12-14 08:11:18",
                            "2023-12-14 08:26:16",
                            "2023-12-14 08:41:11",
                            "2023-12-14 08:56:06",
                            "2023-12-14 09:11:05",
                            "2023-12-14 09:25:59",
                            "2023-12-14 09:40:54",
                            "2023-12-14 09:55:54",
                            "2023-12-14 10:10:50",
                            "2023-12-14 10:25:49",
                            "2023-12-14 10:40:50",
                            "2023-12-14 10:55:46",
                            "2023-12-14 11:10:49",
                            "2023-12-14 11:25:49",
                            "2023-12-14 11:40:53",
                            "2023-12-14 11:55:57",
                            "2023-12-14 12:11:03",
                            "2023-12-14 12:26:07",
                            "2023-12-14 12:41:10",
                            "2023-12-14 12:56:15",
                            "2023-12-14 13:11:20",
                            "2023-12-14 13:26:17",
                            "2023-12-14 13:41:14",
                            "2023-12-14 13:56:19",
                            "2023-12-14 14:11:29",
                            "2023-12-14 14:26:36",
                            "2023-12-14 14:41:42",
                            "2023-12-14 14:56:50",
                            "2023-12-14 15:11:56",
                            "2023-12-14 15:27:03",
                            "2023-12-14 15:43:42",
                            "2023-12-14 16:03:27",
                            "2023-12-14 16:18:33",
                            "2023-12-15 08:07:12",
                            "2023-12-15 08:22:17",
                            "2023-12-15 08:37:22"
                        ],
                        "series": [
                            {
                                "name": "T1-温度",
                                "data": [
                                    102.29894180297852,
                                    102.29629745483399,
                                    102.23545150756836,
                                    101.92857131958007,
                                    100.80952377319336,
                                    100.59259262084962,
                                    102.94509811401367,
                                    106.9523811340332,
                                    125.31208419799805,
                                    141.40508041381835,
                                    126.82300338745117,
                                    151.80006637573243,
                                    148.06150665283204,
                                    136.59817276000976,
                                    140.92794494628907,
                                    135.54761352539063,
                                    123.92720489501953,
                                    163.83681945800782,
                                    140.30905303955078,
                                    135.51568832397462,
                                    129.69624099731445,
                                    146.28722457885743,
                                    158.81241302490236,
                                    174.0026985168457,
                                    115.6296287536621,
                                    115.01587295532227,
                                    114.74603118896485,
                                    114.60317459106446,
                                    114.60052947998047,
                                    114.65872955322266,
                                    114.83068618774413,
                                    115.15608596801758,
                                    115.51322631835937,
                                    115.47089920043945,
                                    115.47883605957031,
                                    115.41005325317383,
                                    115.35714416503906,
                                    115.17724990844727,
                                    115.11111297607422,
                                    115.09788436889649,
                                    115.16137771606445,
                                    115.14021301269531,
                                    115.06084747314453,
                                    115.01322860717774,
                                    114.94708862304688,
                                    114.82804107666016,
                                    114.65608367919921,
                                    114.63227462768555,
                                    114.51322784423829,
                                    114.48412704467773,
                                    114.3783058166504,
                                    114.3227523803711,
                                    114.27513427734375,
                                    114.2433868408203,
                                    114.19576797485351,
                                    114.15608596801758,
                                    114.1428596496582,
                                    114.08201293945312,
                                    114.0370376586914,
                                    100.74626312255859,
                                    82.60629959106446,
                                    113.91599807739257,
                                    115.75925827026367,
                                    115.56084671020508,
                                    115.42063522338867,
                                    115.22222518920898,
                                    114.9126983642578,
                                    114.37037048339843,
                                    113.97618942260742,
                                    113.81216812133789,
                                    113.65079269409179,
                                    113.58730010986328,
                                    113.59788360595704,
                                    113.54232864379883,
                                    120.0424415588379,
                                    91.40557708740235,
                                    78.45026092529297,
                                    78.32722549438476,
                                    78.32722473144531,
                                    78.04450149536133,
                                    76.71989517211914,
                                    75.93979110717774,
                                    74.93193740844727,
                                    75.37958068847657,
                                    78.8317886352539,
                                    96.7917709350586,
                                    106.37301712036133,
                                    97.80519332885743,
                                    99.4458511352539,
                                    96.16058349609375,
                                    88.10295639038085,
                                    90.0783676147461,
                                    90.31052627563477,
                                    92.8840446472168,
                                    104.49470748901368,
                                    100.4803596496582,
                                    83.9580062866211,
                                    89.12030715942383,
                                    88.0288703918457,
                                    87.35695571899414,
                                    87.30708618164063,
                                    105.1772361755371,
                                    100.32366943359375,
                                    96.58157882690429,
                                    95.18947372436523,
                                    94.85263061523438,
                                    94.72105178833007,
                                    128.42275161743163,
                                    165.83333282470704,
                                    169.76800994873048,
                                    191.49864654541017,
                                    195.73441619873046,
                                    192.76990966796876,
                                    175.65768127441407,
                                    173.02753219604492,
                                    95.72368469238282,
                                    95.61578979492188,
                                    95.77368469238282,
                                    117.29759140014649,
                                    119.0596076965332,
                                    117.69311981201172,
                                    112.69576721191406,
                                    103.2957664489746,
                                    91.28546752929688,
                                    91.21847610473633,
                                    122.09361114501954,
                                    160.1209915161133,
                                    156.66214599609376,
                                    154.34677429199218,
                                    146.05512466430665,
                                    124.02548522949219,
                                    124.59514923095703,
                                    101.15758743286133,
                                    106.0661376953125,
                                    115.37221450805664,
                                    105.41507873535156,
                                    113.34656143188477,
                                    109.38411254882813,
                                    109.5535285949707,
                                    102.2360626220703,
                                    107.35714340209961,
                                    109.3677261352539,
                                    109.89153518676758,
                                    121.07202377319337,
                                    127.88108367919922,
                                    136.47467041015625,
                                    135.28000183105468,
                                    131.95732879638672,
                                    131.47999877929686,
                                    140.57359313964844,
                                    138.2010124206543,
                                    116.98756713867188,
                                    86.43569412231446,
                                    86.1784767150879,
                                    85.94750595092773,
                                    84.6194221496582,
                                    83.47769012451172,
                                    81.17322692871093,
                                    87.50822067260742,
                                    92.4715705871582,
                                    105.94443817138672,
                                    111.21451187133789,
                                    113.17876815795898,
                                    107.55815963745117,
                                    105.62616195678712,
                                    121.68418655395507,
                                    106.27342529296875,
                                    100.00034713745117,
                                    109.63211441040039,
                                    105.34391555786132,
                                    106.6719596862793,
                                    109.83410720825195,
                                    99.42708129882813,
                                    93.35526275634766,
                                    92.45555267333984,
                                    103.75183029174805,
                                    96.97716598510742,
                                    95.4815788269043,
                                    94.95000076293945,
                                    98.44493179321289,
                                    125.04607849121093,
                                    120.66928405761719,
                                    123.3657615661621,
                                    150.23869552612305,
                                    189.80484313964843,
                                    198.9349594116211,
                                    128.83348236083984,
                                    99.4578956604004,
                                    99.51052551269531,
                                    99.55262756347656
                                ],
                                "monitorName": "T1"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            },
            {
                "deviceId": "6fa39cbc-7c56-4dd6-a02b-2089ccf085e9",
                "deviceName": "1",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [],
                        "series": [
                            {
                                "name": "V1-阶次-速度振动总值",
                                "data": [],
                                "monitorName": "V1-阶次"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            },
            {
                "deviceId": "d06098c3-b882-4a76-bf39-f5ba7405ec99",
                "deviceName": "886",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [
                            "2023-12-08 08:49:15",
                            "2023-12-08 09:08:54",
                            "2023-12-08 09:24:02",
                            "2023-12-08 09:39:08",
                            "2023-12-08 09:54:17",
                            "2023-12-08 10:09:28",
                            "2023-12-08 10:24:53",
                            "2023-12-08 10:40:02",
                            "2023-12-08 10:55:12",
                            "2023-12-08 11:10:24",
                            "2023-12-08 11:25:32",
                            "2023-12-08 11:40:41",
                            "2023-12-08 11:55:52",
                            "2023-12-08 12:11:06",
                            "2023-12-08 12:26:12",
                            "2023-12-08 12:41:21",
                            "2023-12-08 12:56:36",
                            "2023-12-08 13:11:40",
                            "2023-12-08 13:26:47",
                            "2023-12-08 13:41:53",
                            "2023-12-08 13:57:00",
                            "2023-12-08 14:12:10",
                            "2023-12-08 14:27:24",
                            "2023-12-08 14:42:37",
                            "2023-12-08 14:57:49",
                            "2023-12-08 15:12:58",
                            "2023-12-08 15:28:01",
                            "2023-12-08 15:43:06",
                            "2023-12-08 15:58:10",
                            "2023-12-08 16:13:17",
                            "2023-12-08 16:28:24",
                            "2023-12-08 16:43:32",
                            "2023-12-08 16:58:37",
                            "2023-12-09 08:19:10",
                            "2023-12-09 08:34:07",
                            "2023-12-09 08:48:57",
                            "2023-12-09 09:03:51",
                            "2023-12-09 09:18:50",
                            "2023-12-09 09:33:45",
                            "2023-12-09 09:48:39",
                            "2023-12-09 10:03:49",
                            "2023-12-09 10:18:49",
                            "2023-12-09 10:33:49",
                            "2023-12-09 10:48:47",
                            "2023-12-09 11:03:44",
                            "2023-12-09 11:18:46",
                            "2023-12-09 11:33:38",
                            "2023-12-09 11:48:35",
                            "2023-12-09 12:03:28",
                            "2023-12-09 12:18:24",
                            "2023-12-09 12:33:17",
                            "2023-12-09 12:48:17",
                            "2023-12-09 13:03:16",
                            "2023-12-09 13:18:16",
                            "2023-12-09 13:33:16",
                            "2023-12-09 13:48:16",
                            "2023-12-09 14:03:19",
                            "2023-12-09 14:18:14",
                            "2023-12-09 14:33:10",
                            "2023-12-09 14:48:03",
                            "2023-12-09 15:02:57",
                            "2023-12-09 15:17:50",
                            "2023-12-09 15:32:40",
                            "2023-12-09 15:47:33",
                            "2023-12-09 16:02:38",
                            "2023-12-09 16:17:28",
                            "2023-12-09 16:32:24",
                            "2023-12-09 16:47:15",
                            "2023-12-09 17:02:05",
                            "2023-12-11 13:33:58",
                            "2023-12-11 13:49:08",
                            "2023-12-11 14:04:17",
                            "2023-12-11 14:19:28",
                            "2023-12-11 14:34:37",
                            "2023-12-11 14:49:47",
                            "2023-12-11 15:04:57",
                            "2023-12-11 15:20:07",
                            "2023-12-11 15:35:19",
                            "2023-12-11 15:50:32",
                            "2023-12-11 16:05:42",
                            "2023-12-11 16:20:54",
                            "2023-12-11 16:36:08",
                            "2023-12-11 16:51:21",
                            "2023-12-11 17:06:37",
                            "2023-12-12 07:39:22",
                            "2023-12-12 07:54:08",
                            "2023-12-12 08:09:03",
                            "2023-12-12 08:23:58",
                            "2023-12-12 08:38:50",
                            "2023-12-12 08:53:47",
                            "2023-12-12 09:08:38",
                            "2023-12-12 09:23:31",
                            "2023-12-12 09:38:23",
                            "2023-12-12 09:53:15",
                            "2023-12-12 10:08:24",
                            "2023-12-12 10:23:36",
                            "2023-12-12 10:38:42",
                            "2023-12-12 10:53:47",
                            "2023-12-12 11:08:47",
                            "2023-12-12 11:23:49",
                            "2023-12-12 11:38:50",
                            "2023-12-12 11:53:50",
                            "2023-12-12 12:08:49",
                            "2023-12-12 12:23:45",
                            "2023-12-12 12:38:38",
                            "2023-12-12 12:53:34",
                            "2023-12-12 13:08:28",
                            "2023-12-12 13:23:30",
                            "2023-12-12 13:38:31",
                            "2023-12-12 13:53:30",
                            "2023-12-12 14:08:27",
                            "2023-12-12 14:23:25",
                            "2023-12-12 14:38:28",
                            "2023-12-12 14:53:34",
                            "2023-12-12 15:08:32",
                            "2023-12-12 15:23:29",
                            "2023-12-12 15:38:38",
                            "2023-12-12 15:53:39",
                            "2023-12-12 16:08:40",
                            "2023-12-12 16:23:38",
                            "2023-12-12 16:38:42",
                            "2023-12-12 16:53:50",
                            "2023-12-12 17:09:02",
                            "2023-12-12 17:24:05",
                            "2023-12-13 07:54:21",
                            "2023-12-13 08:09:29",
                            "2023-12-13 08:24:28",
                            "2023-12-13 08:39:25",
                            "2023-12-13 08:54:30",
                            "2023-12-13 09:09:28",
                            "2023-12-13 09:24:23",
                            "2023-12-13 09:39:26",
                            "2023-12-13 09:54:21",
                            "2023-12-13 10:09:19",
                            "2023-12-13 10:24:30",
                            "2023-12-13 10:39:34",
                            "2023-12-13 10:54:37",
                            "2023-12-13 11:09:40",
                            "2023-12-13 11:24:57",
                            "2023-12-13 11:40:06",
                            "2023-12-13 11:55:09",
                            "2023-12-13 12:10:12",
                            "2023-12-13 12:25:13",
                            "2023-12-13 12:40:11",
                            "2023-12-13 12:55:13",
                            "2023-12-13 13:10:17",
                            "2023-12-13 13:25:15",
                            "2023-12-13 13:40:14",
                            "2023-12-13 13:55:17",
                            "2023-12-13 14:10:25",
                            "2023-12-13 14:25:27",
                            "2023-12-13 14:40:26",
                            "2023-12-13 14:55:25",
                            "2023-12-13 15:10:21",
                            "2023-12-13 15:25:22",
                            "2023-12-13 15:40:24",
                            "2023-12-13 15:55:22",
                            "2023-12-13 16:10:21",
                            "2023-12-13 16:25:22",
                            "2023-12-13 16:40:20",
                            "2023-12-13 16:55:22",
                            "2023-12-14 07:44:17",
                            "2023-12-14 07:59:16",
                            "2023-12-14 08:14:20",
                            "2023-12-14 08:29:15",
                            "2023-12-14 08:44:11",
                            "2023-12-14 08:59:07",
                            "2023-12-14 09:14:04",
                            "2023-12-14 09:28:58",
                            "2023-12-14 09:43:57",
                            "2023-12-14 09:58:58",
                            "2023-12-14 10:13:51",
                            "2023-12-14 10:28:52",
                            "2023-12-14 10:43:49",
                            "2023-12-14 10:58:48",
                            "2023-12-14 11:13:49",
                            "2023-12-14 11:28:49",
                            "2023-12-14 11:43:52",
                            "2023-12-14 11:59:00",
                            "2023-12-14 12:14:05",
                            "2023-12-14 12:29:09",
                            "2023-12-14 12:44:10",
                            "2023-12-14 12:59:16",
                            "2023-12-14 13:14:23",
                            "2023-12-14 13:29:19",
                            "2023-12-14 13:44:17",
                            "2023-12-14 13:59:25",
                            "2023-12-14 14:14:36",
                            "2023-12-14 14:29:40",
                            "2023-12-14 14:44:47",
                            "2023-12-14 14:59:53",
                            "2023-12-14 15:14:59",
                            "2023-12-14 15:30:06",
                            "2023-12-14 15:45:11",
                            "2023-12-14 16:00:28",
                            "2023-12-14 16:15:31",
                            "2023-12-15 08:04:11",
                            "2023-12-15 08:19:17",
                            "2023-12-15 08:34:20"
                        ],
                        "series": [
                            {
                                "name": "V3-速度振动总值",
                                "data": [],
                                "monitorName": "V3"
                            },
                            {
                                "name": "V5-速度振动总值",
                                "data": [],
                                "monitorName": "V5"
                            },
                            {
                                "name": "V8-速度振动总值",
                                "data": [],
                                "monitorName": "V8"
                            },
                            {
                                "name": "V4-速度振动总值",
                                "data": [],
                                "monitorName": "V4"
                            },
                            {
                                "name": "V2-速度振动总值",
                                "data": [],
                                "monitorName": "V2"
                            },
                            {
                                "name": "V6-速度振动总值",
                                "data": [],
                                "monitorName": "V6"
                            },
                            {
                                "name": "V7-速度振动总值",
                                "data": [],
                                "monitorName": "V7"
                            },
                            {
                                "name": "V1-速度振动总值",
                                "data": [
                                    0.0078931,
                                    0.0072239999999999995,
                                    0.0079278,
                                    0.007653,
                                    0.007678,
                                    0.0076419,
                                    0.007491300000000001,
                                    0.0081852,
                                    0.0072379,
                                    0.006952700000000001,
                                    0.0070725,
                                    0.007166500000000001,
                                    0.0071657,
                                    0.007024,
                                    0.007020899999999999,
                                    0.0071453,
                                    0.0073513,
                                    0.007753600000000001,
                                    0.0075082,
                                    0.007024,
                                    0.0070951,
                                    0.0072440000000000004,
                                    0.0080232,
                                    0.0073620000000000005,
                                    0.007515900000000001,
                                    0.007443900000000001,
                                    0.0075835,
                                    0.007906199999999999,
                                    0.0075194,
                                    0.007681100000000001,
                                    0.0079734,
                                    0.0078356,
                                    0.0081853,
                                    0.008385199999999999,
                                    0.008129899999999999,
                                    0.0078823,
                                    0.007724300000000001,
                                    0.0077734,
                                    0.008257,
                                    0.0085189,
                                    0.0078398,
                                    0.0079837,
                                    0.0075037,
                                    0.0075851,
                                    0.0079539,
                                    0.0080216,
                                    0.0083325,
                                    0.008023800000000001,
                                    0.0073812,
                                    0.007453700000000001,
                                    0.0081992,
                                    0.0088305,
                                    0.008624,
                                    0.0080241,
                                    0.0078078999999999996,
                                    0.0075797,
                                    0.007809100000000001,
                                    0.0081744,
                                    0.0079468,
                                    0.0088137,
                                    0.010264200000000001,
                                    0.0099286,
                                    0.0099893,
                                    0.009866900000000001,
                                    0.0099085,
                                    0.0101746,
                                    0.0101618,
                                    0.0102568,
                                    0.0075842999999999995,
                                    0.0074227,
                                    0.0072842,
                                    0.0072769,
                                    0.007453700000000001,
                                    0.0073039,
                                    0.0071283,
                                    0.0074331,
                                    0.007292999999999999,
                                    0.007335800000000001,
                                    0.0072118,
                                    0.0071527000000000006,
                                    0.0072969,
                                    0.0071152,
                                    0.0073149999999999995,
                                    0.0073846,
                                    0.008920599999999999,
                                    0.0083874,
                                    0.0077234,
                                    0.0078823,
                                    0.0080468,
                                    0.0074071,
                                    0.007437000000000001,
                                    0.007386800000000001,
                                    0.0073274,
                                    0.007306600000000001,
                                    0.008910600000000001,
                                    0.0072946999999999994,
                                    0.0076194999999999995,
                                    0.008018800000000001,
                                    0.0078439,
                                    0.0078578,
                                    0.0079553,
                                    0.008400399999999999,
                                    0.0081659,
                                    0.0079652,
                                    0.0082451,
                                    0.0080506,
                                    0.0078621,
                                    0.0078472,
                                    0.0081845,
                                    0.0084992,
                                    0.0081183,
                                    0.0078291,
                                    0.008095,
                                    0.008236,
                                    0.0078533,
                                    0.0084066,
                                    0.0089905,
                                    0.0112321,
                                    0.0077239000000000006,
                                    0.007411900000000001,
                                    0.0077438,
                                    0.007630100000000001,
                                    0.0078629,
                                    0.0083637,
                                    0.0086217,
                                    0.0084692,
                                    0.0081016,
                                    0.0081708,
                                    0.0077681,
                                    0.007649,
                                    0.0076572,
                                    0.007659399999999999,
                                    0.007626900000000001,
                                    0.0077123,
                                    0.0078039,
                                    0.007775,
                                    0.0077410000000000005,
                                    0.0077365,
                                    0.0078394,
                                    0.007832500000000001,
                                    0.0073244,
                                    0.0074064000000000005,
                                    0.0076965,
                                    0.0080433,
                                    0.007571799999999999,
                                    0.0076407,
                                    0.0077821,
                                    0.007576299999999999,
                                    0.0076444,
                                    0.007841299999999999,
                                    0.007544,
                                    0.0076431,
                                    0.0076728000000000005,
                                    0.0075195999999999995,
                                    0.0071795,
                                    0.0069464,
                                    0.0071684,
                                    0.007874,
                                    0.0077751,
                                    0.0081536,
                                    0.0081294,
                                    0.0081675,
                                    0.0080251,
                                    0.0079848,
                                    0.007875799999999999,
                                    0.0077012999999999995,
                                    0.0109868,
                                    0.01351,
                                    0.0146558,
                                    0.0144009,
                                    0.0145866,
                                    0.013850200000000002,
                                    0.014519299999999999,
                                    0.013028300000000001,
                                    0.0126967,
                                    0.010077,
                                    0.007499500000000001,
                                    0.0104821,
                                    0.0115267,
                                    0.0119505,
                                    0.013211200000000001,
                                    0.0144316,
                                    0.0142015,
                                    0.0131709,
                                    0.012612600000000002,
                                    0.0122074,
                                    0.014275,
                                    0.0148861,
                                    0.0134991,
                                    0.0143985,
                                    0.0133414,
                                    0.0090656,
                                    0.007561099999999999,
                                    0.0075037,
                                    0.0092488,
                                    0.008063299999999999,
                                    0.008154999999999999,
                                    0.0077755,
                                    0.007481000000000001
                                ],
                                "monitorName": "V1"
                            }
                        ]
                    },
                    {
                        "monitorItemType": 20001,
                        "times": [
                            "2023-12-08 08:50:45",
                            "2023-12-08 09:10:23",
                            "2023-12-08 09:25:31",
                            "2023-12-08 09:40:38",
                            "2023-12-08 09:55:46",
                            "2023-12-08 10:10:57",
                            "2023-12-08 10:26:22",
                            "2023-12-08 10:41:33",
                            "2023-12-08 10:56:41",
                            "2023-12-08 11:11:53",
                            "2023-12-08 11:27:02",
                            "2023-12-08 11:42:09",
                            "2023-12-08 11:57:21",
                            "2023-12-08 12:12:36",
                            "2023-12-08 12:27:40",
                            "2023-12-08 12:42:50",
                            "2023-12-08 12:58:07",
                            "2023-12-08 13:13:08",
                            "2023-12-08 13:28:14",
                            "2023-12-08 13:43:21",
                            "2023-12-08 13:58:28",
                            "2023-12-08 14:13:40",
                            "2023-12-08 14:28:55",
                            "2023-12-08 14:44:06",
                            "2023-12-08 14:59:18",
                            "2023-12-08 15:14:27",
                            "2023-12-08 15:29:30",
                            "2023-12-08 15:44:35",
                            "2023-12-08 15:59:38",
                            "2023-12-08 16:14:46",
                            "2023-12-08 16:29:52",
                            "2023-12-08 16:45:01",
                            "2023-12-08 17:00:07",
                            "2023-12-09 08:20:37",
                            "2023-12-09 08:35:33",
                            "2023-12-09 08:50:22",
                            "2023-12-09 09:05:16",
                            "2023-12-09 09:20:17",
                            "2023-12-09 09:35:13",
                            "2023-12-09 09:50:09",
                            "2023-12-09 10:05:17",
                            "2023-12-09 10:20:16",
                            "2023-12-09 10:35:17",
                            "2023-12-09 10:50:16",
                            "2023-12-09 11:05:14",
                            "2023-12-09 11:20:12",
                            "2023-12-09 11:35:02",
                            "2023-12-09 11:50:00",
                            "2023-12-09 12:04:55",
                            "2023-12-09 12:19:53",
                            "2023-12-09 12:34:45",
                            "2023-12-09 12:57:11",
                            "2023-12-09 13:12:13",
                            "2023-12-09 13:37:45",
                            "2023-12-09 13:52:42",
                            "2023-12-09 14:07:44",
                            "2023-12-09 14:22:39",
                            "2023-12-09 14:37:36",
                            "2023-12-09 14:52:28",
                            "2023-12-09 15:07:23",
                            "2023-12-09 15:22:16",
                            "2023-12-09 15:37:03",
                            "2023-12-09 15:51:58",
                            "2023-12-09 16:07:05",
                            "2023-12-09 16:21:56",
                            "2023-12-09 16:36:48",
                            "2023-12-09 16:51:39",
                            "2023-12-11 13:32:22",
                            "2023-12-11 13:47:35",
                            "2023-12-11 14:02:43",
                            "2023-12-11 14:17:52",
                            "2023-12-11 14:33:03",
                            "2023-12-12 11:10:16",
                            "2023-12-12 11:25:19",
                            "2023-12-12 11:40:19",
                            "2023-12-12 11:55:18",
                            "2023-12-12 12:10:16",
                            "2023-12-12 12:25:10",
                            "2023-12-12 12:40:06",
                            "2023-12-12 12:54:58",
                            "2023-12-12 13:09:54",
                            "2023-12-12 13:24:55",
                            "2023-12-12 13:39:56",
                            "2023-12-12 13:54:59",
                            "2023-12-12 14:09:56",
                            "2023-12-12 14:24:54",
                            "2023-12-12 14:39:56",
                            "2023-12-12 14:55:04",
                            "2023-12-12 15:10:00",
                            "2023-12-12 15:24:58",
                            "2023-12-12 15:40:03",
                            "2023-12-12 15:55:06",
                            "2023-12-12 16:10:06",
                            "2023-12-12 16:25:03",
                            "2023-12-12 16:40:08",
                            "2023-12-12 16:55:17",
                            "2023-12-12 17:10:28",
                            "2023-12-12 17:25:31",
                            "2023-12-13 07:55:48",
                            "2023-12-13 08:10:55",
                            "2023-12-13 08:25:54",
                            "2023-12-13 08:40:55",
                            "2023-12-13 08:55:59",
                            "2023-12-13 09:10:56",
                            "2023-12-13 09:25:51",
                            "2023-12-13 09:40:55",
                            "2023-12-13 09:55:50",
                            "2023-12-13 10:10:46",
                            "2023-12-13 10:25:59",
                            "2023-12-13 10:41:02",
                            "2023-12-13 10:56:04",
                            "2023-12-13 11:11:06",
                            "2023-12-13 11:26:22",
                            "2023-12-13 11:41:33",
                            "2023-12-13 11:56:34",
                            "2023-12-13 12:11:39",
                            "2023-12-13 12:26:38",
                            "2023-12-13 12:41:36",
                            "2023-12-13 12:56:41",
                            "2023-12-13 13:11:45",
                            "2023-12-13 13:26:44",
                            "2023-12-13 13:41:43",
                            "2023-12-13 13:56:46",
                            "2023-12-13 14:11:53",
                            "2023-12-13 14:26:55",
                            "2023-12-13 14:41:55",
                            "2023-12-13 14:56:52",
                            "2023-12-13 15:11:46",
                            "2023-12-13 15:26:47",
                            "2023-12-13 15:41:50",
                            "2023-12-13 15:56:47",
                            "2023-12-13 16:11:50",
                            "2023-12-13 16:26:51",
                            "2023-12-13 16:41:49",
                            "2023-12-13 16:56:50",
                            "2023-12-14 07:45:43",
                            "2023-12-14 08:00:43",
                            "2023-12-14 08:15:45",
                            "2023-12-14 08:30:44",
                            "2023-12-14 08:45:39",
                            "2023-12-14 09:00:36",
                            "2023-12-14 09:15:32",
                            "2023-12-14 09:30:27",
                            "2023-12-14 09:45:22",
                            "2023-12-14 10:00:23",
                            "2023-12-14 10:15:17",
                            "2023-12-14 10:30:17",
                            "2023-12-14 10:45:17",
                            "2023-12-14 11:00:17",
                            "2023-12-14 11:15:17",
                            "2023-12-14 11:30:17",
                            "2023-12-14 11:45:21",
                            "2023-12-14 12:00:30",
                            "2023-12-14 12:15:33",
                            "2023-12-14 12:30:39",
                            "2023-12-14 12:45:40",
                            "2023-12-14 13:00:45",
                            "2023-12-14 13:15:51",
                            "2023-12-14 13:30:45",
                            "2023-12-14 13:45:44",
                            "2023-12-14 14:00:50",
                            "2023-12-14 14:16:02",
                            "2023-12-14 14:31:06",
                            "2023-12-14 14:46:15",
                            "2023-12-14 15:01:19",
                            "2023-12-14 15:16:25"
                        ],
                        "series": [
                            {
                                "name": "OT1-温度",
                                "data": [
                                    180.00858459472656,
                                    179.47439270019532,
                                    179.23450317382813,
                                    178.760107421875,
                                    178.13477020263673,
                                    177.8005386352539,
                                    177.5606475830078,
                                    177.4339630126953,
                                    177.19676818847657,
                                    176.9541763305664,
                                    176.8113220214844,
                                    176.73045806884767,
                                    175.9784378051758,
                                    175.74393615722656,
                                    176.0458236694336,
                                    175.99730377197267,
                                    175.973046875,
                                    175.90835723876953,
                                    175.94339752197266,
                                    175.86792755126953,
                                    175.76549682617187,
                                    175.84905700683595,
                                    175.6738525390625,
                                    175.60916290283203,
                                    175.67385559082032,
                                    175.56334075927734,
                                    175.87600860595703,
                                    175.91105194091796,
                                    174.76819610595703,
                                    175.68193969726562,
                                    176.53638763427733,
                                    176.9676544189453,
                                    178.3531005859375,
                                    178.95148162841798,
                                    178.95148010253905,
                                    178.44204711914062,
                                    178.81132049560546,
                                    178.88409729003905,
                                    178.6388153076172,
                                    178.74932861328125,
                                    179.00269317626953,
                                    179.34770660400392,
                                    179.40700988769532,
                                    179.3342300415039,
                                    180.32278747558593,
                                    180.40921630859376,
                                    180.61517791748048,
                                    181.70189666748047,
                                    182.69376525878906,
                                    185.0298095703125,
                                    193.45799560546874,
                                    195.66937561035155,
                                    196.85907897949218,
                                    184.24119262695314,
                                    184.51761322021486,
                                    188.03252258300782,
                                    183.87804718017577,
                                    183.81842803955078,
                                    192.08401184082032,
                                    188.21409301757814,
                                    175.85962524414063,
                                    172.7466293334961,
                                    173.70081024169923,
                                    173.7789749145508,
                                    174.47708740234376,
                                    173.27762908935546,
                                    172.15094451904298,
                                    197.58807830810548,
                                    196.8916000366211,
                                    197.7750671386719,
                                    198.49051513671876,
                                    199.25203399658204,
                                    135.8213317871094,
                                    135.69066619873047,
                                    135.80266876220702,
                                    135.8240005493164,
                                    135.97866668701172,
                                    136.37866821289063,
                                    136.79733276367188,
                                    137.30133361816405,
                                    137.36000061035156,
                                    137.45333099365234,
                                    137.2586654663086,
                                    137.46399688720703,
                                    137.8000015258789,
                                    138.16533508300782,
                                    138.05866546630858,
                                    138.12800140380858,
                                    138.4106658935547,
                                    138.94400024414062,
                                    139.31466674804688,
                                    139.87733459472656,
                                    140.1413330078125,
                                    140.4479995727539,
                                    141.17066650390626,
                                    141.70933227539064,
                                    142.07733459472655,
                                    142.27733154296874,
                                    143.12800140380858,
                                    143.83466491699218,
                                    144.29866790771484,
                                    144.8933334350586,
                                    146.13599853515626,
                                    146.39200134277343,
                                    146.34399871826173,
                                    146.1173324584961,
                                    146.07466735839844,
                                    146.39199981689453,
                                    146.65333251953126,
                                    146.79200134277343,
                                    147.26133422851564,
                                    147.94666442871093,
                                    147.70133361816406,
                                    147.52533264160155,
                                    147.46399993896483,
                                    148.23733367919922,
                                    148.86399993896484,
                                    149.49866790771483,
                                    150.24213104248048,
                                    150.96505432128907,
                                    152.23924865722657,
                                    155.3306442260742,
                                    155.10752716064454,
                                    154.30376281738282,
                                    154.3521514892578,
                                    155.06182708740235,
                                    155.66129150390626,
                                    156.2258087158203,
                                    156.56451721191405,
                                    157.01344299316406,
                                    158.3279586791992,
                                    158.2768814086914,
                                    158.51881561279296,
                                    158.7204330444336,
                                    159.13709564208983,
                                    162.2741928100586,
                                    163.71773986816407,
                                    163.78225708007812,
                                    163.81989440917968,
                                    163.2016128540039,
                                    163.63978271484376,
                                    166.20699005126954,
                                    169.76905670166016,
                                    171.3665756225586,
                                    172.3126693725586,
                                    175.74932556152345,
                                    179.30768585205078,
                                    179.32614440917968,
                                    179.3881393432617,
                                    179.99582214355468,
                                    181.42328948974608,
                                    181.2384811401367,
                                    181.72357788085938,
                                    182.28997497558595,
                                    182.09756164550782,
                                    183.56097717285155,
                                    187.35230255126953,
                                    190.41192321777345,
                                    192.1517593383789,
                                    190.7615203857422,
                                    191.31165618896483,
                                    190.8292663574219,
                                    190.875341796875,
                                    191.11111145019532,
                                    196.27642517089845,
                                    199.0379409790039
                                ],
                                "monitorName": "OT1"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            },
            {
                "deviceId": "e13561f9-962e-40ca-8914-63cd71e5c484",
                "deviceName": "8888888888",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [],
                        "series": [
                            {
                                "name": "V1-速度振动总值",
                                "data": [],
                                "monitorName": "V1"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            },
            {
                "deviceId": "7c8558b9-95a4-4055-9ef4-8e01eb5f7339",
                "deviceName": "3",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [],
                        "series": [
                            {
                                "name": "V1-速度振动总值",
                                "data": [],
                                "monitorName": "V1"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            },
            {
                "deviceId": "d02dbbb0-eefb-4c8b-813f-750a75fdbc5a",
                "deviceName": "m333333",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [],
                        "series": [
                            {
                                "name": "V2-速度振动总值",
                                "data": [],
                                "monitorName": "V2"
                            },
                            {
                                "name": "V1-速度振动总值",
                                "data": [],
                                "monitorName": "V1"
                            }
                        ]
                    },
                    {
                        "monitorItemType": 20001,
                        "times": [],
                        "series": [
                            {
                                "name": "BT1-温度",
                                "data": [],
                                "monitorName": "BT1"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            },
            {
                "deviceId": "4096ffa1-fc64-4d65-8dce-fe83a8405524",
                "deviceName": "2",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [],
                        "series": [
                            {
                                "name": "V1-速度振动总值",
                                "data": [],
                                "monitorName": "V1"
                            },
                            {
                                "name": "V2-速度振动总值",
                                "data": [],
                                "monitorName": "V2"
                            }
                        ]
                    },
                    {
                        "monitorItemType": 20001,
                        "times": [],
                        "series": [
                            {
                                "name": "BT1-温度",
                                "data": [],
                                "monitorName": "BT1"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            },
            {
                "deviceId": "d41b9041-8784-4634-a89c-ae76ce5eddd4",
                "deviceName": "故障2",
                "monitors": [
                    {
                        "monitorItemType": 10009,
                        "times": [
                            "2023-12-08 08:49:15",
                            "2023-12-08 09:08:54",
                            "2023-12-08 09:24:02",
                            "2023-12-08 09:39:08",
                            "2023-12-08 09:54:17",
                            "2023-12-08 10:09:28",
                            "2023-12-08 10:24:53",
                            "2023-12-08 10:40:02",
                            "2023-12-08 10:55:12",
                            "2023-12-08 11:10:24",
                            "2023-12-08 11:25:32",
                            "2023-12-08 11:40:41",
                            "2023-12-08 11:55:52",
                            "2023-12-08 12:11:06",
                            "2023-12-08 12:26:12",
                            "2023-12-08 12:41:21",
                            "2023-12-08 12:56:36",
                            "2023-12-08 13:11:40",
                            "2023-12-08 13:26:47",
                            "2023-12-08 13:41:53",
                            "2023-12-08 13:57:00",
                            "2023-12-08 14:12:10",
                            "2023-12-08 14:27:24",
                            "2023-12-08 14:42:37",
                            "2023-12-08 14:57:49",
                            "2023-12-08 15:12:58",
                            "2023-12-08 15:28:01",
                            "2023-12-08 15:43:06",
                            "2023-12-08 15:58:10",
                            "2023-12-08 16:13:17",
                            "2023-12-08 16:28:24",
                            "2023-12-08 16:43:32",
                            "2023-12-08 16:58:37",
                            "2023-12-09 08:19:10",
                            "2023-12-09 08:34:07",
                            "2023-12-09 08:48:57",
                            "2023-12-09 09:03:51",
                            "2023-12-09 09:18:50",
                            "2023-12-09 09:33:45",
                            "2023-12-09 09:48:39",
                            "2023-12-09 10:03:49",
                            "2023-12-09 10:18:49",
                            "2023-12-09 10:33:49",
                            "2023-12-09 10:48:47",
                            "2023-12-09 11:03:44",
                            "2023-12-09 11:18:46",
                            "2023-12-09 11:33:38",
                            "2023-12-09 11:48:35",
                            "2023-12-09 12:03:28",
                            "2023-12-09 12:18:24",
                            "2023-12-09 12:33:17",
                            "2023-12-09 12:48:17",
                            "2023-12-09 13:03:16",
                            "2023-12-09 13:18:16",
                            "2023-12-09 13:33:16",
                            "2023-12-09 13:48:16",
                            "2023-12-09 14:03:19",
                            "2023-12-09 14:18:14",
                            "2023-12-09 14:33:10",
                            "2023-12-09 14:48:03",
                            "2023-12-09 15:02:57",
                            "2023-12-09 15:17:50",
                            "2023-12-09 15:32:40",
                            "2023-12-09 15:47:33",
                            "2023-12-09 16:02:38",
                            "2023-12-09 16:17:28",
                            "2023-12-09 16:32:24",
                            "2023-12-09 16:47:15",
                            "2023-12-09 17:02:05",
                            "2023-12-11 13:33:58",
                            "2023-12-11 13:49:08",
                            "2023-12-11 14:04:17",
                            "2023-12-11 14:19:28",
                            "2023-12-11 14:34:37",
                            "2023-12-11 14:49:47",
                            "2023-12-11 15:04:57",
                            "2023-12-11 15:20:07",
                            "2023-12-11 15:35:19",
                            "2023-12-11 15:50:32",
                            "2023-12-11 16:05:42",
                            "2023-12-11 16:20:54",
                            "2023-12-11 16:36:08",
                            "2023-12-11 16:51:21",
                            "2023-12-11 17:06:37",
                            "2023-12-12 07:39:22",
                            "2023-12-12 07:54:08",
                            "2023-12-12 08:09:03",
                            "2023-12-12 08:23:58",
                            "2023-12-12 08:38:50",
                            "2023-12-12 08:53:47",
                            "2023-12-12 09:08:38",
                            "2023-12-12 09:23:31",
                            "2023-12-12 09:38:23",
                            "2023-12-12 09:53:15",
                            "2023-12-12 10:08:24",
                            "2023-12-12 10:23:36",
                            "2023-12-12 10:38:42",
                            "2023-12-12 10:53:47",
                            "2023-12-12 11:08:47",
                            "2023-12-12 11:23:49",
                            "2023-12-12 11:38:50",
                            "2023-12-12 11:53:50",
                            "2023-12-12 12:08:49",
                            "2023-12-12 12:23:45",
                            "2023-12-12 12:38:38",
                            "2023-12-12 12:53:34",
                            "2023-12-12 13:08:28",
                            "2023-12-12 13:23:30",
                            "2023-12-12 13:38:31",
                            "2023-12-12 13:53:30",
                            "2023-12-12 14:08:27",
                            "2023-12-12 14:23:25",
                            "2023-12-12 14:38:28",
                            "2023-12-12 14:53:34",
                            "2023-12-12 15:08:32",
                            "2023-12-12 15:23:29",
                            "2023-12-12 15:38:38",
                            "2023-12-12 15:53:39",
                            "2023-12-12 16:08:40",
                            "2023-12-12 16:23:38",
                            "2023-12-12 16:38:42",
                            "2023-12-12 16:53:50",
                            "2023-12-12 17:09:02",
                            "2023-12-12 17:24:05",
                            "2023-12-13 07:54:21",
                            "2023-12-13 08:09:29",
                            "2023-12-13 08:24:28",
                            "2023-12-13 08:39:25",
                            "2023-12-13 08:54:30",
                            "2023-12-13 09:09:28",
                            "2023-12-13 09:24:23",
                            "2023-12-13 09:39:26",
                            "2023-12-13 09:54:21",
                            "2023-12-13 10:09:19",
                            "2023-12-13 10:24:30",
                            "2023-12-13 10:39:34",
                            "2023-12-13 10:54:37",
                            "2023-12-13 11:09:40",
                            "2023-12-13 11:24:57",
                            "2023-12-13 11:40:06",
                            "2023-12-13 11:55:09",
                            "2023-12-13 12:10:12",
                            "2023-12-13 12:25:13",
                            "2023-12-13 12:40:11",
                            "2023-12-13 12:55:13",
                            "2023-12-13 13:10:17",
                            "2023-12-13 13:25:15",
                            "2023-12-13 13:40:14",
                            "2023-12-13 13:55:17",
                            "2023-12-13 14:10:25",
                            "2023-12-13 14:25:27",
                            "2023-12-13 14:40:26",
                            "2023-12-13 14:55:25",
                            "2023-12-13 15:10:21",
                            "2023-12-13 15:25:22",
                            "2023-12-13 15:40:24",
                            "2023-12-13 15:55:22",
                            "2023-12-13 16:10:21",
                            "2023-12-13 16:25:22",
                            "2023-12-13 16:40:20",
                            "2023-12-13 16:55:22",
                            "2023-12-14 07:44:17",
                            "2023-12-14 07:59:16",
                            "2023-12-14 08:14:20",
                            "2023-12-14 08:29:15",
                            "2023-12-14 08:44:11",
                            "2023-12-14 08:59:07",
                            "2023-12-14 09:14:04",
                            "2023-12-14 09:28:58",
                            "2023-12-14 09:43:57",
                            "2023-12-14 09:58:58",
                            "2023-12-14 10:13:51",
                            "2023-12-14 10:28:52",
                            "2023-12-14 10:43:49",
                            "2023-12-14 10:58:48",
                            "2023-12-14 11:13:49",
                            "2023-12-14 11:28:49",
                            "2023-12-14 11:43:52",
                            "2023-12-14 11:59:00",
                            "2023-12-14 12:14:05",
                            "2023-12-14 12:29:09",
                            "2023-12-14 12:44:10",
                            "2023-12-14 12:59:16",
                            "2023-12-14 13:14:23",
                            "2023-12-14 13:29:19",
                            "2023-12-14 13:44:17",
                            "2023-12-14 13:59:25",
                            "2023-12-14 14:14:36",
                            "2023-12-14 14:29:40",
                            "2023-12-14 14:44:47",
                            "2023-12-14 14:59:53",
                            "2023-12-14 15:14:59",
                            "2023-12-14 15:30:06",
                            "2023-12-14 15:45:11",
                            "2023-12-14 16:00:28",
                            "2023-12-14 16:15:31",
                            "2023-12-15 08:04:11",
                            "2023-12-15 08:19:17",
                            "2023-12-15 08:34:20"
                        ],
                        "series": [
                            {
                                "name": "V1-速度振动总值",
                                "data": [
                                    0.007581,
                                    0.007265000000000001,
                                    0.007280699999999999,
                                    0.007402000000000001,
                                    0.0070799,
                                    0.006926699999999999,
                                    0.0069566,
                                    0.0070263999999999995,
                                    0.0071065,
                                    0.0074022,
                                    0.007119200000000001,
                                    0.007656100000000001,
                                    0.0075618000000000005,
                                    0.0073725,
                                    0.007705000000000001,
                                    0.0072776,
                                    0.0072184,
                                    0.0077735,
                                    0.0081452,
                                    0.0078979,
                                    0.0079541,
                                    0.008096,
                                    0.0073677,
                                    0.0074656,
                                    0.0070803,
                                    0.0074215,
                                    0.0073978,
                                    0.007172,
                                    0.007083300000000001,
                                    0.0073131,
                                    0.0071711,
                                    0.0069280999999999995,
                                    0.0079097,
                                    0.008616799999999999,
                                    0.007616200000000001,
                                    0.007790900000000001,
                                    0.0078068,
                                    0.0077453999999999995,
                                    0.007403600000000001,
                                    0.007199800000000001,
                                    0.0071219000000000005,
                                    0.0070674,
                                    0.007097000000000001,
                                    0.0071025,
                                    0.007359300000000001,
                                    0.007354299999999999,
                                    0.0070189,
                                    0.0072946,
                                    0.007188600000000001,
                                    0.0072970000000000005,
                                    0.0081998,
                                    0.0067678,
                                    0.007044300000000001,
                                    0.0075157,
                                    0.007655199999999999,
                                    0.0076346,
                                    0.007045,
                                    0.006999900000000001,
                                    0.0069147,
                                    0.0070217000000000005,
                                    0.007238699999999999,
                                    0.007114199999999999,
                                    0.0073167,
                                    0.0072016,
                                    0.0074502,
                                    0.008081099999999999,
                                    0.0080177,
                                    0.0080141,
                                    0.0075956999999999995,
                                    0.0077372,
                                    0.007488400000000001,
                                    0.0069509,
                                    0.0069830000000000005,
                                    0.0069734,
                                    0.007313700000000001,
                                    0.0072448,
                                    0.0070231,
                                    0.0071754,
                                    0.0078794,
                                    0.007534000000000001,
                                    0.0072338,
                                    0.0076836000000000005,
                                    0.0074004,
                                    0.009049999999999999,
                                    0.0085958,
                                    0.0093751,
                                    0.0085825,
                                    0.008226899999999999,
                                    0.0076971999999999995,
                                    0.007646999999999999,
                                    0.007524899999999999,
                                    0.0074295,
                                    0.0084375,
                                    0.0093828,
                                    0.0100997,
                                    0.0105047,
                                    0.0106256,
                                    0.010125199999999999,
                                    0.008222799999999999,
                                    0.008383499999999999,
                                    0.0094016,
                                    0.0085318,
                                    0.00848,
                                    0.0092668,
                                    0.0094696,
                                    0.0080607,
                                    0.009111900000000001,
                                    0.0085515,
                                    0.0081016,
                                    0.007754700000000001,
                                    0.0082048,
                                    0.0081581,
                                    0.0076078000000000005,
                                    0.007028700000000001,
                                    0.0069106,
                                    0.006733,
                                    0.0067894999999999995,
                                    0.0079602,
                                    0.0069143,
                                    0.0078571,
                                    0.0076131,
                                    0.0077112,
                                    0.0076234,
                                    0.008901000000000001,
                                    0.0106127,
                                    0.0084633,
                                    0.0079273,
                                    0.0080483,
                                    0.0078165,
                                    0.0081263,
                                    0.0084643,
                                    0.0079179,
                                    0.007758900000000001,
                                    0.0075634000000000005,
                                    0.0081334,
                                    0.007971700000000002,
                                    0.007749500000000001,
                                    0.0079526,
                                    0.0075423,
                                    0.0079911,
                                    0.0077020000000000005,
                                    0.0070897,
                                    0.0069334999999999996,
                                    0.0070734000000000005,
                                    0.0070187,
                                    0.0068802,
                                    0.0070931,
                                    0.0069886,
                                    0.007065,
                                    0.007373,
                                    0.0072243,
                                    0.007072,
                                    0.0067526,
                                    0.0069199,
                                    0.006742199999999999,
                                    0.0067425,
                                    0.0072505,
                                    0.007226399999999999,
                                    0.0071397000000000006,
                                    0.006705600000000001,
                                    0.007329,
                                    0.008642,
                                    0.007564400000000001,
                                    0.0074989,
                                    0.007177,
                                    0.006991800000000001,
                                    0.007091999999999999,
                                    0.007309100000000001,
                                    0.0085866,
                                    0.007197,
                                    0.0073785000000000005,
                                    0.0073134,
                                    0.007703,
                                    0.0073874,
                                    0.0073379,
                                    0.0076565999999999995,
                                    0.0074319,
                                    0.0072453000000000005,
                                    0.0076098,
                                    0.0074578000000000005,
                                    0.0085386,
                                    0.007716100000000001,
                                    0.007295899999999999,
                                    0.0074527,
                                    0.0074010000000000005,
                                    0.0076394,
                                    0.0075161,
                                    0.0074267,
                                    0.0070404,
                                    0.007420399999999999,
                                    0.0091923,
                                    0.0084651,
                                    0.0083627,
                                    0.008189,
                                    0.0075544,
                                    0.0083393,
                                    0.0104775,
                                    0.009103,
                                    0.008467666666666667
                                ],
                                "monitorName": "V1"
                            }
                        ]
                    },
                    {
                        "monitorItemType": 20001,
                        "times": [],
                        "series": [
                            {
                                "name": "T1-温度",
                                "data": [],
                                "monitorName": "T1"
                            }
                        ]
                    }
                ],
                "oilTime": {
                    "nowTime": "2023-12-19 13:38:29",
                    "runTime": "0.0",
                    "lastOilChangeTime": "1970-01-01 08:00:00",
                    "nextOilChangeTime": "0.0"
                }
            }
        ],
        "historicalAlarmInfo": [
            {
                "id": "00be22d4-4263-49a7-961a-dc645bbd92ee",
                "deviceId": "d41b9041-8784-4634-a89c-ae76ce5eddd4",
                "monitorName": "润滑油时间",
                "monitorItemName": "剩余寿命",
                "monitorstatus": "解除",
                "alarmCount": 1598,
                "alarmTime": "2023-12-07 14:44:51",
                "cancelTime": "2023-12-13 14:34:24",
                "alarmDetail": "",
                "monitorValues": {
                    "name": "剩余寿命",
                    "unit": "h",
                    "earlyWarningValue": "-1.0",
                    "alarmValue": "199.0",
                    "data": [
                        {
                            "timestamp": "2023-12-07 14:44:51",
                            "value": 199.0
                        },
                        {
                            "timestamp": "2023-12-07 14:46:22",
                            "value": 198.97
                        },
                        {
                            "timestamp": "2023-12-07 14:47:51",
                            "value": 198.95
                        },
                        {
                            "timestamp": "2023-12-07 14:49:23",
                            "value": 198.92
                        },
                        {
                            "timestamp": "2023-12-07 14:50:56",
                            "value": 198.9
                        },
                        {
                            "timestamp": "2023-12-07 14:52:26",
                            "value": 198.87
                        },
                        {
                            "timestamp": "2023-12-07 14:53:57",
                            "value": 198.85
                        },
                        {
                            "timestamp": "2023-12-07 14:55:30",
                            "value": 198.82
                        },
                        {
                            "timestamp": "2023-12-07 14:57:00",
                            "value": 198.8
                        },
                        {
                            "timestamp": "2023-12-07 14:58:30",
                            "value": 198.77
                        },
                        {
                            "timestamp": "2023-12-07 15:00:03",
                            "value": 198.75
                        },
                        {
                            "timestamp": "2023-12-07 15:01:35",
                            "value": 198.72
                        },
                        {
                            "timestamp": "2023-12-07 15:03:04",
                            "value": 198.7
                        },
                        {
                            "timestamp": "2023-12-07 15:04:38",
                            "value": 198.67
                        },
                        {
                            "timestamp": "2023-12-07 15:06:10",
                            "value": 198.64
                        },
                        {
                            "timestamp": "2023-12-07 15:07:41",
                            "value": 198.62
                        },
                        {
                            "timestamp": "2023-12-07 15:09:12",
                            "value": 198.59
                        },
                        {
                            "timestamp": "2023-12-07 15:10:45",
                            "value": 198.57
                        },
                        {
                            "timestamp": "2023-12-07 15:12:16",
                            "value": 198.54
                        },
                        {
                            "timestamp": "2023-12-07 15:13:45",
                            "value": 198.52
                        },
                        {
                            "timestamp": "2023-12-07 15:15:17",
                            "value": 198.49
                        },
                        {
                            "timestamp": "2023-12-07 15:16:49",
                            "value": 198.47
                        },
                        {
                            "timestamp": "2023-12-07 15:18:19",
                            "value": 198.44
                        },
                        {
                            "timestamp": "2023-12-07 15:19:50",
                            "value": 198.42
                        },
                        {
                            "timestamp": "2023-12-07 15:21:21",
                            "value": 198.39
                        },
                        {
                            "timestamp": "2023-12-07 15:22:50",
                            "value": 198.37
                        },
                        {
                            "timestamp": "2023-12-07 15:24:21",
                            "value": 198.34
                        },
                        {
                            "timestamp": "2023-12-07 15:25:54",
                            "value": 198.32
                        },
                        {
                            "timestamp": "2023-12-07 15:27:26",
                            "value": 198.29
                        },
                        {
                            "timestamp": "2023-12-07 15:28:55",
                            "value": 198.27
                        },
                        {
                            "timestamp": "2023-12-07 15:30:28",
                            "value": 198.24
                        },
                        {
                            "timestamp": "2023-12-07 15:32:00",
                            "value": 198.21
                        },
                        {
                            "timestamp": "2023-12-07 15:33:29",
                            "value": 198.19
                        },
                        {
                            "timestamp": "2023-12-07 15:35:00",
                            "value": 198.16
                        },
                        {
                            "timestamp": "2023-12-07 15:36:33",
                            "value": 198.14
                        },
                        {
                            "timestamp": "2023-12-07 15:38:03",
                            "value": 198.11
                        },
                        {
                            "timestamp": "2023-12-07 15:39:33",
                            "value": 198.09
                        },
                        {
                            "timestamp": "2023-12-07 15:41:06",
                            "value": 198.06
                        },
                        {
                            "timestamp": "2023-12-07 15:42:39",
                            "value": 198.04
                        },
                        {
                            "timestamp": "2023-12-07 15:44:09",
                            "value": 198.01
                        },
                        {
                            "timestamp": "2023-12-07 15:45:41",
                            "value": 197.99
                        },
                        {
                            "timestamp": "2023-12-07 15:47:14",
                            "value": 197.96
                        },
                        {
                            "timestamp": "2023-12-07 15:48:43",
                            "value": 197.94
                        },
                        {
                            "timestamp": "2023-12-07 15:50:15",
                            "value": 197.91
                        },
                        {
                            "timestamp": "2023-12-07 15:51:47",
                            "value": 197.88
                        },
                        {
                            "timestamp": "2023-12-07 15:53:18",
                            "value": 197.86
                        },
                        {
                            "timestamp": "2023-12-07 15:54:46",
                            "value": 197.83
                        },
                        {
                            "timestamp": "2023-12-07 15:56:19",
                            "value": 197.81
                        },
                        {
                            "timestamp": "2023-12-07 15:57:49",
                            "value": 197.78
                        },
                        {
                            "timestamp": "2023-12-07 15:59:18",
                            "value": 197.76
                        },
                        {
                            "timestamp": "2023-12-07 16:00:50",
                            "value": 197.73
                        },
                        {
                            "timestamp": "2023-12-07 16:02:22",
                            "value": 197.71
                        },
                        {
                            "timestamp": "2023-12-07 16:03:50",
                            "value": 197.68
                        },
                        {
                            "timestamp": "2023-12-07 16:05:21",
                            "value": 197.66
                        },
                        {
                            "timestamp": "2023-12-07 16:06:53",
                            "value": 197.63
                        },
                        {
                            "timestamp": "2023-12-07 16:08:22",
                            "value": 197.61
                        },
                        {
                            "timestamp": "2023-12-07 16:09:52",
                            "value": 197.58
                        },
                        {
                            "timestamp": "2023-12-07 16:11:24",
                            "value": 197.56
                        },
                        {
                            "timestamp": "2023-12-07 16:12:55",
                            "value": 197.53
                        },
                        {
                            "timestamp": "2023-12-07 16:14:24",
                            "value": 197.51
                        },
                        {
                            "timestamp": "2023-12-07 16:15:56",
                            "value": 197.48
                        },
                        {
                            "timestamp": "2023-12-07 16:17:28",
                            "value": 197.46
                        },
                        {
                            "timestamp": "2023-12-07 16:18:58",
                            "value": 197.43
                        },
                        {
                            "timestamp": "2023-12-07 16:20:30",
                            "value": 197.41
                        },
                        {
                            "timestamp": "2023-12-07 16:22:03",
                            "value": 197.38
                        },
                        {
                            "timestamp": "2023-12-07 16:23:31",
                            "value": 197.36
                        },
                        {
                            "timestamp": "2023-12-07 16:25:03",
                            "value": 197.33
                        },
                        {
                            "timestamp": "2023-12-07 16:26:36",
                            "value": 197.3
                        },
                        {
                            "timestamp": "2023-12-07 16:28:07",
                            "value": 197.28
                        },
                        {
                            "timestamp": "2023-12-07 16:29:37",
                            "value": 197.25
                        },
                        {
                            "timestamp": "2023-12-07 16:31:09",
                            "value": 197.23
                        },
                        {
                            "timestamp": "2023-12-07 16:32:41",
                            "value": 197.2
                        },
                        {
                            "timestamp": "2023-12-07 16:34:09",
                            "value": 197.18
                        },
                        {
                            "timestamp": "2023-12-07 16:35:42",
                            "value": 197.15
                        },
                        {
                            "timestamp": "2023-12-07 16:37:14",
                            "value": 197.13
                        },
                        {
                            "timestamp": "2023-12-07 16:38:45",
                            "value": 197.1
                        },
                        {
                            "timestamp": "2023-12-07 16:40:15",
                            "value": 197.08
                        },
                        {
                            "timestamp": "2023-12-07 16:41:48",
                            "value": 197.05
                        },
                        {
                            "timestamp": "2023-12-07 16:43:20",
                            "value": 197.03
                        },
                        {
                            "timestamp": "2023-12-07 16:44:49",
                            "value": 197.0
                        },
                        {
                            "timestamp": "2023-12-07 16:46:20",
                            "value": 196.98
                        },
                        {
                            "timestamp": "2023-12-07 16:47:51",
                            "value": 196.95
                        },
                        {
                            "timestamp": "2023-12-07 16:49:20",
                            "value": 196.93
                        },
                        {
                            "timestamp": "2023-12-07 16:50:52",
                            "value": 196.9
                        },
                        {
                            "timestamp": "2023-12-07 16:52:23",
                            "value": 196.87
                        },
                        {
                            "timestamp": "2023-12-07 16:53:51",
                            "value": 196.85
                        },
                        {
                            "timestamp": "2023-12-07 16:55:23",
                            "value": 196.82
                        },
                        {
                            "timestamp": "2023-12-07 16:56:55",
                            "value": 196.8
                        },
                        {
                            "timestamp": "2023-12-07 16:58:24",
                            "value": 196.77
                        },
                        {
                            "timestamp": "2023-12-07 16:59:54",
                            "value": 196.75
                        },
                        {
                            "timestamp": "2023-12-07 17:01:26",
                            "value": 196.72
                        },
                        {
                            "timestamp": "2023-12-07 17:02:57",
                            "value": 196.7
                        }
                    ]
                }
            },
            {
                "id": "7aef1160-9a56-4eee-8610-8d2338e7ed01",
                "deviceId": "ae2b804c-ae5c-4da6-906c-f444c2bf72ee",
                "monitorName": "润滑油时间",
                "monitorItemName": "剩余寿命",
                "monitorstatus": "预警",
                "alarmCount": 3,
                "alarmTime": "2023-12-07 14:40:21",
                "cancelTime": "",
                "alarmDetail": "",
                "monitorValues": {
                    "name": "剩余寿命",
                    "unit": "",
                    "earlyWarningValue": "1.0",
                    "alarmValue": "201.0",
                    "data": [
                        {
                            "timestamp": "2023-12-07 13:39:51",
                            "value": 201.0
                        },
                        {
                            "timestamp": "2023-12-07 13:41:22",
                            "value": 200.97
                        },
                        {
                            "timestamp": "2023-12-07 13:42:51",
                            "value": 200.95
                        },
                        {
                            "timestamp": "2023-12-07 13:44:22",
                            "value": 200.92
                        },
                        {
                            "timestamp": "2023-12-07 13:45:53",
                            "value": 200.9
                        },
                        {
                            "timestamp": "2023-12-07 13:47:22",
                            "value": 200.87
                        },
                        {
                            "timestamp": "2023-12-07 13:48:54",
                            "value": 200.85
                        },
                        {
                            "timestamp": "2023-12-07 13:50:26",
                            "value": 200.82
                        },
                        {
                            "timestamp": "2023-12-07 13:51:55",
                            "value": 200.8
                        },
                        {
                            "timestamp": "2023-12-07 13:53:24",
                            "value": 200.77
                        },
                        {
                            "timestamp": "2023-12-07 13:54:55",
                            "value": 200.75
                        },
                        {
                            "timestamp": "2023-12-07 13:56:25",
                            "value": 200.72
                        },
                        {
                            "timestamp": "2023-12-07 13:57:54",
                            "value": 200.7
                        },
                        {
                            "timestamp": "2023-12-07 13:59:26",
                            "value": 200.67
                        },
                        {
                            "timestamp": "2023-12-07 14:00:59",
                            "value": 200.65
                        },
                        {
                            "timestamp": "2023-12-07 14:02:28",
                            "value": 200.62
                        },
                        {
                            "timestamp": "2023-12-07 14:04:00",
                            "value": 200.6
                        },
                        {
                            "timestamp": "2023-12-07 14:05:32",
                            "value": 200.57
                        },
                        {
                            "timestamp": "2023-12-07 14:07:01",
                            "value": 200.55
                        },
                        {
                            "timestamp": "2023-12-07 14:08:31",
                            "value": 200.52
                        },
                        {
                            "timestamp": "2023-12-07 14:10:03",
                            "value": 200.5
                        },
                        {
                            "timestamp": "2023-12-07 14:11:34",
                            "value": 200.47
                        },
                        {
                            "timestamp": "2023-12-07 14:13:04",
                            "value": 200.45
                        },
                        {
                            "timestamp": "2023-12-07 14:14:35",
                            "value": 200.42
                        },
                        {
                            "timestamp": "2023-12-07 14:16:08",
                            "value": 200.4
                        },
                        {
                            "timestamp": "2023-12-07 14:17:37",
                            "value": 200.37
                        },
                        {
                            "timestamp": "2023-12-07 14:19:09",
                            "value": 200.35
                        },
                        {
                            "timestamp": "2023-12-07 14:20:40",
                            "value": 200.32
                        },
                        {
                            "timestamp": "2023-12-07 14:22:10",
                            "value": 200.29
                        },
                        {
                            "timestamp": "2023-12-07 14:23:40",
                            "value": 200.27
                        },
                        {
                            "timestamp": "2023-12-07 14:25:12",
                            "value": 200.24
                        },
                        {
                            "timestamp": "2023-12-07 14:26:43",
                            "value": 200.22
                        },
                        {
                            "timestamp": "2023-12-07 14:28:12",
                            "value": 200.19
                        },
                        {
                            "timestamp": "2023-12-07 14:29:45",
                            "value": 200.17
                        },
                        {
                            "timestamp": "2023-12-07 14:31:18",
                            "value": 200.14
                        },
                        {
                            "timestamp": "2023-12-07 14:32:46",
                            "value": 200.12
                        },
                        {
                            "timestamp": "2023-12-07 14:34:18",
                            "value": 200.09
                        },
                        {
                            "timestamp": "2023-12-07 14:35:50",
                            "value": 200.07
                        },
                        {
                            "timestamp": "2023-12-07 14:37:18",
                            "value": 200.04
                        },
                        {
                            "timestamp": "2023-12-07 14:38:48",
                            "value": 200.02
                        },
                        {
                            "timestamp": "2023-12-07 14:40:21",
                            "value": 199.99
                        },
                        {
                            "timestamp": "2023-12-07 14:41:50",
                            "value": 199.97
                        },
                        {
                            "timestamp": "2023-12-07 14:43:19",
                            "value": 199.94
                        }
                    ]
                }
            },
            {
                "id": "504d9a33-7585-4452-a697-3bf7137a6a6f",
                "deviceId": "d06098c3-b882-4a76-bf39-f5ba7405ec99",
                "monitorName": "V1",
                "monitorItemName": "速度振动总值",
                "monitorstatus": "解除",
                "alarmCount": 1256,
                "alarmTime": "2023-12-01 14:03:20",
                "cancelTime": "2023-12-08 08:52:20",
                "alarmDetail": "",
                "monitorValues": {
                    "name": "速度振动总值",
                    "unit": "mm/s",
                    "earlyWarningValue": "0.001",
                    "alarmValue": "0.002",
                    "data": [
                        {
                            "timestamp": "2023-12-01 07:48:26",
                            "value": 0.0091
                        },
                        {
                            "timestamp": "2023-12-01 08:04:34",
                            "value": 0.0091
                        },
                        {
                            "timestamp": "2023-12-01 08:19:26",
                            "value": 0.0087
                        },
                        {
                            "timestamp": "2023-12-01 08:32:36",
                            "value": 0.0081
                        },
                        {
                            "timestamp": "2023-12-01 08:50:18",
                            "value": 0.0076
                        },
                        {
                            "timestamp": "2023-12-01 09:04:57",
                            "value": 0.0073
                        },
                        {
                            "timestamp": "2023-12-01 09:25:33",
                            "value": 0.0074
                        },
                        {
                            "timestamp": "2023-12-01 09:38:47",
                            "value": 0.0092
                        },
                        {
                            "timestamp": "2023-12-01 10:01:12",
                            "value": 0.0073
                        },
                        {
                            "timestamp": "2023-12-01 10:07:11",
                            "value": 0.0076
                        },
                        {
                            "timestamp": "2023-12-01 10:20:35",
                            "value": 0.0071
                        },
                        {
                            "timestamp": "2023-12-01 10:32:33",
                            "value": 0.0072
                        },
                        {
                            "timestamp": "2023-12-01 10:53:35",
                            "value": 0.0074
                        },
                        {
                            "timestamp": "2023-12-01 11:02:39",
                            "value": 0.0071
                        },
                        {
                            "timestamp": "2023-12-01 11:25:13",
                            "value": 0.0068
                        },
                        {
                            "timestamp": "2023-12-01 11:34:18",
                            "value": 0.0107
                        },
                        {
                            "timestamp": "2023-12-01 11:50:51",
                            "value": 0.0075
                        },
                        {
                            "timestamp": "2023-12-01 12:10:24",
                            "value": 0.0072
                        },
                        {
                            "timestamp": "2023-12-01 12:29:55",
                            "value": 0.007
                        },
                        {
                            "timestamp": "2023-12-01 12:38:54",
                            "value": 0.0069
                        },
                        {
                            "timestamp": "2023-12-01 12:58:44",
                            "value": 0.0069
                        },
                        {
                            "timestamp": "2023-12-01 13:15:17",
                            "value": 0.0072
                        },
                        {
                            "timestamp": "2023-12-01 13:27:17",
                            "value": 0.0083
                        },
                        {
                            "timestamp": "2023-12-01 13:39:18",
                            "value": 0.0073
                        },
                        {
                            "timestamp": "2023-12-01 13:55:53",
                            "value": 0.0073
                        },
                        {
                            "timestamp": "2023-12-01 14:04:51",
                            "value": 0.007
                        },
                        {
                            "timestamp": "2023-12-01 14:18:23",
                            "value": 0.0071
                        }
                    ]
                }
            }
        ]
    }
		this.loading = false;
      },
      // 打印下载
      async handleOutput() {
        // let oldStr = window.document.body.innerHTML; // 获取body的内容
        // let newStr = document.querySelector(".pdf-panel").innerHTML;
        // window.document.body.innerHTML = newStr; // 把需要打印的指定内容赋给body
        window.print(); // 调用浏览器的打印功能打印指定区域
        // window.document.body.innerHTML = oldStr; // body替换为原来的内容
		// 		// 下载提示
		// 		this.handleOutputLoading = true;
		// 		this.option = this.$message({
		// 			message: "正在下载中，请勿重复点击",
		// 			type: "warning",
		// 			duration:0,
		// 		});
        // const element = document.querySelector('.pdf-panel');
        // const header = document.querySelector('.pdf-header');
        // const footer = document.querySelector('.pdf-footer');
        // const a4main = document.querySelector('.a4main');
        // const statement = document.querySelector('.statement');
  		// a4main.querySelector('#companyName').innerText = this.runningReportData.deptName;
  		// a4main.querySelector('#runCycle').innerText = this.runningReportData.periodic;
  		// a4main.querySelector('#a4Report').innerText = this.runningReportData.userName;
  		// a4main.querySelector('#a4Date').innerText = this.runningReportData.date;
        // try {
        //   await outputPDF({
        //     element: element,
        //     footer: footer,
        //     header: header,
		// 				a4main: a4main,
		// 				statement: statement,
        //     contentWidth: 560
        //   })
		// 			// 成功的消息提示
		// 			this.option ? this.option.close():'';
		// 			this.$message.success(`下载成功`)
		// 			this.handleOutputLoading = false;
        // } catch (error) {
		// 			this.option ? this.option.close():'';
		// 			this.handleOutputLoading = false;
        //   console.log(error,"error")
        //   // message.error(typeof error === 'string' ? error : JSON.stringify(error))
        // }
      }
    }

};
</script>

<style scoped  lang="scss">
@media print {
  @page {
    margin: 0;
    /* 纵向 */
    size: portrait; 
    /* 边距 上右下左 */
    margin: 1cm 2cm 1cm 2cm;
  }
  body {
    margin: 1cm;
  }
}

* {
	box-sizing: border-box;
	font-family: "宋体","微软雅黑","黑体";
}

.outputpdf-body{
	//margin: 50px;
	height: 100%;
}

.navigation {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 98%;
	height: 10vh;
	background-color: #fff;
	//box-shadow:0 0 6px rgba(0, 0, 0, .04)
}

.ctn {
	display: flex;
	justify-content: center;
	.pdf-ctn {
		width: 1300px;
		margin-bottom: 15vh;
		.pdf-panel {
			position: relative;
			padding-top: 100px;
		}
	}
}

.allInfo {
	width: 100%;
	//border: 1px solid #333;

	table {
		width: 100%;
	}

	thead {
		height: 36px;
		background-color: #bfbfbf;
		color: #000;
		font-size: 18px;
	}

	.tdTit {
		font-size: 18px;
	}
}

.detection {
	width: 100%;

	table {
		width: 100%;
	}

	tr {
		height: 36px;
		color: #000;

		.itemEcharts {
			width: 100%;
			height: 180px;
		}

		.itemTxt {
			margin-left: 40px;
			height: 120px;
			display: flex;
			justify-content: center;
			flex-direction: column;

			.txtItem {

			}
		}
	}

	thead {
		width: 100%;
		height: 36px;
		color: #000;
		font-size: 18px;
	}
}

.historical {
	width: 100%;

	table {
		width: 100%;
	}

	tr {
		height: 36px;
		color: #000;

		.itemEcharts {
			width: 100%;
			height: 180px;
		}

		.itemTxt {
			margin-left: 40px;
			height: 120px;
			display: flex;
			justify-content: center;
			flex-direction: column;

			.txtItem {

			}
		}
	}

	thead {
		width: 100%;
		height: 36px;
		color: #000;
		font-size: 18px;
	}

	tbody {
		width: 100%;
	}

	.basics-tr {
		td:nth-child(2) {
			justify-content: center;
		}
	}
}

.basics-tr {
  height: 36px;
  color: #000;
  display: flex;

  td:first-child {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
	background-color: #bfbfbf;
  }

  td:nth-child(2) {
    width: calc(100% - 20%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

table{
	border-collapse: collapse;
}

th, td {
	border: 1px solid #333;
}

.pdf-header {
    font-weight: bold;
    padding: 1.5vw 8.3vw;
    width: 100%;
    color: rgba(0, 0, 0, 0.85);
    margin: 0;

    .headerCon {
        width: 100%;
        border-bottom: 0.25vw solid rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: space-between;

        .headerTitle {
            font-size: 2.1875vw;
            transform: translate(2%, 80%);
            line-height: 2.1875vw;
            margin-left: 0.5vw;
        }

        .sewpng {
            width: 15%;
            transform: translate(0%, 10%);
            margin-top: -0.2vw;
        }
    }

    .pageNum {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        font-size: 1.8vw;
        font-weight: 600;

        .pdf-footer-page-count {
            margin-right: 1vw;
        }
    }
}

.a4main {
	padding-top: 14vw;
    width: 100%;
    height: calc(100vw * sqrt(2));
	// background-color: white;
	.title {
		width: 100%;
		height: 6vw;
		font-size: 4vw;
		font-weight: bold;
		text-align: center;
		line-height: 6vw;
        display: flex;
        justify-content: center;
	}
	.table {
		margin: 0 auto;
		margin-top: 56.7vw;
		width: 60vw;
	}
	.table .tr:nth-child(odd) {
		background-color: #bfbfbf;
	}
	.tr {
		height: 4.2vw;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		font-size: 1.8vw;

        .td {
            height: 4.2vw;
            line-height: 4.2vw;
        }

        .td:nth-child(odd) {
            width: 32%;
            padding-left: 0.1vw;
        }

        .td:nth-child(even) {
            width: 68%;
        }
	}
}

.statement {
    padding-top: 14.2vw;
    width: 100%;
    height: calc(100vw * sqrt(2));
    /* background-color: white; */

    .title {
        font-weight: 600;
        font-size: 2.7vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title2 {
        font-weight: 600;
        margin-top: 18.2vw;
    }

    .content {
        margin-top: 1.8vw;
        padding: 0 6vw;
        font-size: 1.7vw;
        text-align: justify;
        /*兼容ie*/
        text-justify: distribute-all-lines;
        line-height: 2.7vw;
        text-indent: 0.9vw;
    }

    .content2 {
        margin-top: 4vw;
        font-size: 1.9vw;
        text-indent: 3.9vw;
    }
}
</style>
