import { ref } from 'vue';

export interface ISimpleTableData {
  city: string;
  totalOrders: string;
}

export interface IPaginatedTableData {
  picture: string;
  name: string;
  role: string;
  created: string;
  status: string;
  statusColor: string;
}

export interface IWideTableData {
  name: string;
  email: string;
  title: string;
  title2: string;
  status: string;
  role: string;
}

export interface IFasteyesObservationTableData {
  deviceName: string;
  time: string;
  department: string;
  serial_number: string;
  staff: string;
  temperature: string;
  status: string;
}

export interface IFasteyesAttentanceTableData {
  department: string;
  serial_number: string;
  staff: string;
  checkin: string;  
  checkin_temperature: string;
  checkout: string;  
  checkout_temperature: string;  
  status: string;
}


export interface IStaffTableData {
  department: string;
  serial_number: string;
  staff: string;
  facedetect: string;  
}

export interface IfasteyesDeviceTableData {
  device_name: string;
  device_descrip: string;
  temperature_alarm: string;
  upload: string;  
  time: string;  
}

export interface Itemperature_humidityObservationTableData {
  device_name: string;
  device_serial_number: string;
  area: string;
  time: string;  
  temperature: string;  
  humidity: string;  
  status: string;
}

export interface Itemperature_humidityDeviceTableData {
  device_name: string;
  device_serial_number: string;
  area: string;
  temperature_up_limit: string;
  temperature_down_limit: string;
  humidity_up_limit: string;
  humidity_down_limit: string;
  battery: string;
  status: string;
}
// const tableColumns = ["deviceName", "time", "department", "id", "staff", "temperature", "status"];
const fasteyestableData = [
  {
    deviceName: "FasteyesDevice1",
    time: "2021.02.28 21:40:06",
    department: "RD",
    serial_number: "400430012",
    staff: "ricky",
    temperature: "36.8°C",
    status: "0"
  },
  {
    deviceName: "FasteyesDevice2",
    time: "2021.02.28 21:40:06",
    department: "PM",
    serial_number: "400430",
    staff: "SDF",
    temperature: "37.8°C",
    status: "1"
  },
  {
    deviceName: "FasteyesDevice1",
    time: "2021.02.28 23:40:06",
    department: "PM",
    serial_number: "400430sdfgw",
    staff: "SDFwrg",
    temperature: "35.8°C",
    status: "0"
  }
];

const fasteyes_attendancetableData = [
  {
    department: "RD",
    serial_number: "400430sdfgw",
    staff: "Ricky",
    checkin: "2021.02.28 02:40:06",  
    checkin_temperature: "35.8°C",
    checkout: "2021.02.28 23:40:06",  
    checkout_temperature: "34.8°C", 
    status: "string"
  },
  {
    department: "RD",
    serial_number: "400430sdfgw",
    staff: "Ricky",
    checkin: "2021.02.28 02:40:06",  
    checkin_temperature: "35.8°C",
    checkout: "2021.02.28 23:40:06",  
    checkout_temperature: "34.8°C", 
    status: "string"
  },
  {
    department: "RD",
    serial_number: "400430sdfgw",
    staff: "Ricky",
    checkin: "2021.02.28 02:40:06",  
    checkin_temperature: "35.8°C",
    checkout: "2021.02.28 23:40:06",  
    checkout_temperature: "34.8°C", 
    status: "string"
  }
]

const stafftableData = [
  {
    department: "RD",
    serial_number: "400430012",
    staff: "ricky",
    facedetect: "1"
  },
  {
    department: "RD",
    serial_number: "400430012",
    staff: "ricky",
    facedetect: "1"
  },
  {
    department: "RD",
    serial_number: "400430012",
    staff: "ricky",
    facedetect: "1"
  },
]

const fasteyesDeviceTableData = [
  {
    device_name: "device_name",
    device_descrip: "device_descrip",
    temperature_alarm: "37.9°C",
    upload: "1",
    time: "2021.02.28 23:40:06"
  },
  {
    device_name: "device_name",
    device_descrip: "device_descrip",
    temperature_alarm: "37.9°C",
    upload: "1",
    time: "2021.02.28 23:40:06"
  },
  {
    device_name: "device_name",
    device_descrip: "device_descrip",
    temperature_alarm: "37.9°C",
    upload: "1",
    time: "2021.02.28 23:40:06"
  },
]

const temperature_humidityObservationTableData = [
  {
    device_name: "temperature_humidityDevice1",
    device_serial_number: "1705EF",
    area: "room",
    time: "2021.02.28 23:40:06", 
    temperature: "40.2",
    humidity: "27.4",
    status: "0"
  },
  {
    device_name: "temperature_humidityDevice2",
    device_serial_number: "1705AF",
    area: "room",
    time: "2021.02.28 23:40:06", 
    temperature: "40.2",
    humidity: "27.4",
    status: "0"
  },
  {
    device_name: "temperature_humidityDevice3",
    device_serial_number: "1705ET",
    area: "room",
    time: "2021.02.28 23:40:06", 
    temperature: "40.2",
    humidity: "27.4",
    status: "0"
  },
]


const temperature_humidityDeviceTableData = [
  {
    device_name: "temperature_humidityDevice1",
    device_serial_number: "1705AF",
    area: "room",
    temperature_up_limit: "70",
    temperature_down_limit: "50",
    humidity_up_limit: "40",
    humidity_down_limit: "20",
    battery: "90",
    status: "1"
  },
  {
    device_name: "temperature_humidityDevice2",
    device_serial_number: "17051A",
    area: "room",
    temperature_up_limit: "60",
    temperature_down_limit: "50",
    humidity_up_limit: "40",
    humidity_down_limit: "24",
    battery: "80",
    status: "1"
  },
  {
    device_name: "temperature_humidityDevice3",
    device_serial_number: "1705G6",
    area: "room",
    temperature_up_limit: "60",
    temperature_down_limit: "50",
    humidity_up_limit: "40",
    humidity_down_limit: "34",
    battery: "70",
    status: "0"
  },
]
export function useTableData() {
  const simpleTableData = ref<ISimpleTableData[]>([
    { city: 'New York', totalOrders: '200,120' },
    { city: 'Manchester', totalOrders: '632,310' },
    { city: 'London', totalOrders: '451,110' },
    { city: 'Madrid', totalOrders: '132,524' },
  ]);

  const paginatedTableData = ref<IPaginatedTableData[]>([
    {
      picture:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
      name: 'Vera Carpenter',
      role: 'Admin',
      created: 'Jan 21, 2020',
      status: 'Active',
      statusColor: 'green',
    },
    {
      picture:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
      name: 'Blake Bowman',
      role: 'Editor',
      created: 'Jan 01, 2020',
      status: 'Active',
      statusColor: 'green',
    },
    {
      picture:
        'https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
      name: 'Dana Moore',
      role: 'Editor',
      created: 'Jan 10, 2020',
      status: 'Suspended',
      statusColor: 'orange',
    },
    {
      picture:
        'https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80',
      name: 'Alonzo Cox',
      role: 'Admin',
      created: 'Jan 18, 2020',
      status: 'Inactive',
      statusColor: 'red',
    },
  ]);

  const wideTableData = ref<IWideTableData[]>(
    [...Array(10).keys()].map(() => ({
      name: 'John Doe',
      email: 'john@example.com',
      title: 'Software Engineer',
      title2: 'Web dev',
      status: 'Active',
      role: 'Owner',
    }))
  );


  const tableData = ref<IFasteyesObservationTableData[]>(
    fasteyestableData
    );


  const attendancetableData = ref<IFasteyesAttentanceTableData[]>(
    fasteyes_attendancetableData
    );

  const staff_tableData = ref<IStaffTableData[]>(
    stafftableData
    );

  const fasteyes_Device_tableData = ref<IfasteyesDeviceTableData[]>(
    fasteyesDeviceTableData
    );

  const temperature_humidity_ObservationTableData = ref<Itemperature_humidityObservationTableData[]>(
    temperature_humidityObservationTableData
    );

  const temperature_humidity_DeviceTableData = ref<Itemperature_humidityDeviceTableData[]>(
    temperature_humidityDeviceTableData
    );
    
  return {
    simpleTableData,
    paginatedTableData,
    wideTableData,
    tableData,
    attendancetableData,
    staff_tableData,
    fasteyes_Device_tableData,
    temperature_humidity_ObservationTableData,
    temperature_humidity_DeviceTableData
  };
}
