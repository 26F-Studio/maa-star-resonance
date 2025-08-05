export interface AdbDevice {
  name: string;
  adb_path: string;
  address: string;
  screencap_methods: number | string;
  input_methods: number | string;
  config: string;
}

interface TaskWaitFreezesConfig {
  method?: 1 | 3 | 5; // Default: 5
  rate_limit?: number; // Default: 1000
  target?: true | string | number[]; // Default: true
  target_offset?: number[]; // Default: [0, 0, 0, 0]
  threshold?: number; // Default: 0.95
  time?: number; // Default: 1
  timeout?: number; // Default: 20000
}

interface TaskCommonConfig {
  enabled?: boolean; // Default: true
  focus?: null; // TODO: Unsupported, waiting for doc update
  interrupt?: string | string[];
  inverse?: boolean; // Default: false
  next?: string | string[];
  on_error?: string | string[];
  post_delay?: number; // Default: 200
  post_wait_freezes?: number | TaskWaitFreezesConfig; // Default: 0
  pre_delay?: number; // Default: 200
  pre_wait_freezes?: number | TaskWaitFreezesConfig; // Default: 0
  rate_limit?: number; // Default: 1000
  timeout?: number; // Default: 20000
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#directhit
interface TaskRecognitionConfigDirectHit {
  recognition?: 'DirectHit';
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#templatematch
interface TaskRecognitionConfigTemplateMatch {
  recognition: 'TemplateMatch';
  roi?: number[] | string; // Default: [0, 0, 0, 0]
  roi_offset?: number[]; // Default: [0, 0, 0, 0]
  template: string | string[]; // Image resolution: 720p
  threshold?: number; // Default: 0.7
  order_by?: 'Horizontal' | 'Vertical' | 'Score' | 'Random'; // Default: 'Horizontal'
  index?: number; // Default: 0
  method?: 1 | 3 | 5; // Default: 5
  green_mask?: boolean; // Default: false
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#featurematch
interface TaskRecognitionConfigFeatureMatch {
  recognition: 'FeatureMatch';
  roi?: number[] | string; // Default: [0, 0, 0, 0]
  roi_offset?: number[]; // Default: [0, 0, 0, 0]
  template: string | string[]; // Image resolution: 720p
  count?: number; // Default: 4
  order_by?: 'Horizontal' | 'Vertical' | 'Score' | 'Area' | 'Random'; // Default: 'Horizontal'
  index?: number; // Default: 0
  green_mask?: boolean; // Default: false
  detector?: 'SIFT' | 'KAZE' | 'AKAZE' | 'BRISK' | 'ORB'; // Default: 'SIFT'
  ratio?: number; // Default: 0.6
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#colormatch
interface TaskRecognitionConfigColorMatch {
  recognition: 'ColorMatch';
  roi?: number[] | string; // Default: [0, 0, 0, 0]
  roi_offset?: number[]; // Default: [0, 0, 0, 0]
  method?: 4 | 40 | 6; // Default: 4
  lower: number[] | number[][];
  upper: number[] | number[][];
  count?: number; // Default: 1
  order_by?: 'Horizontal' | 'Vertical' | 'Score' | 'Area' | 'Random'; // Default: 'Horizontal'
  index?: number; // Default: 0
  connected?: boolean; // Default: false
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#colormatch
interface TaskRecognitionConfigOCR {
  recognition: 'OCR';
  roi?: number[] | string; // Default: [0, 0, 0, 0]
  roi_offset?: number[]; // Default: [0, 0, 0, 0]
  expected: string | string[];
  threshold?: number; // Default: 0.3
  replace?: string[] | string[][]; // Default: []
  order_by?: 'Horizontal' | 'Vertical' | 'Area' | 'Length' | 'Random'; // Default: 'Horizontal'
  index?: number; // Default: 0
  only_rec?: boolean; // Default: false
  model?: string; // Default: '', relative path to 'model/ocr', need 'rec.onnx', 'det.onnx', 'keys.txt'
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#neuralnetworkclassify
interface TaskRecognitionConfigNeuralNetworkClassify {
  recognition: 'NeuralNetworkClassify';
  roi?: number[] | string; // Default: [0, 0, 0, 0]
  roi_offset?: number[]; // Default: [0, 0, 0, 0]
  labels?: string[]; // Default: []
  model?: string; // Default: '', relative path to 'model/classify', need 'model.onnx'
  expected: number | number[];
  order_by?: 'Horizontal' | 'Vertical' | 'Score' | 'Random'; // Default: 'Horizontal'
  index?: number; // Default: 0
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#neuralnetworkdetect
interface TaskRecognitionConfigNeuralNetworkDetect {
  recognition: 'NeuralNetworkDetect';
  roi?: number[] | string; // Default: [0, 0, 0, 0]
  roi_offset?: number[]; // Default: [0, 0, 0, 0]
  labels?: string[]; // Default: []
  model?: string; // Default: '', relative path to 'model/detect', need 'model.onnx'
  expected: number | number[];
  threshold?: number | number[]; // Default: 0.3
  order_by?: 'Horizontal' | 'Vertical' | 'Score' | 'Area' | 'Random'; // Default: 'Horizontal'
  index?: number; // Default: 0
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#custom
interface TaskRecognitionConfigCustom {
  recognition: 'Custom';
  roi?: number[] | string; // Default: [0, 0, 0, 0]
  roi_offset?: number[]; // Default: [0, 0, 0, 0]
  custom_recognition: string;
  custom_recognition_param?: object; // Default: {}
}

type TaskRecognitionConfig =
  | TaskRecognitionConfigDirectHit
  | TaskRecognitionConfigTemplateMatch
  | TaskRecognitionConfigFeatureMatch
  | TaskRecognitionConfigColorMatch
  | TaskRecognitionConfigOCR
  | TaskRecognitionConfigNeuralNetworkClassify
  | TaskRecognitionConfigNeuralNetworkDetect
  | TaskRecognitionConfigCustom;

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#donothing
interface TaskActionConfigDoNothing {
  action?: 'DoNothing'; // Default: 'DoNothing'
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#click
interface TaskActionConfigClick {
  action: 'Click';
  target?: true | string | number[]; // Default: true
  target_offset?: number[]; // Default: [0, 0, 0, 0]
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#longpress
interface TaskActionConfigLongPress {
  action: 'LongPress';
  target?: true | string | number[]; // Default: true
  target_offset?: number[]; // Default: [0, 0, 0, 0]
  duration?: number; // Default: 1000
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#swipe
interface TaskActionConfigSwipe {
  action: 'Swipe';
  begin?: true | string | number[]; // Default: true
  begin_offset?: number[]; // Default: [0, 0, 0, 0]
  end?: true | string | number[]; // Default: true
  end_offset?: number[]; // Default: [0, 0, 0, 0]
  duration?: number; // Default: 200
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#multiswipe
interface TaskActionConfigMultiSwipe {
  action: 'MultiSwipe';
  swipes: Omit<TaskActionConfigSwipe, 'action'>[]; // Array of swipe actions
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#key
interface TaskActionConfigKey {
  action: 'Key';
  key: number | number[]; // Keycode or array of Keycodes to press
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#inputtext
interface TaskActionConfigInputText {
  action: 'InputText';
  input_text: string; // Text to input
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#startapp
interface TaskActionConfigStartApp {
  action: 'StartApp';
  package: string; // Package name of the app to start
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#stopapp
interface TaskActionConfigStopApp {
  action: 'StopApp';
  package: string; // Package name of the app to stop
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#stoptask
interface TaskActionConfigStopTask {
  action: 'StopTask';
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#command
interface TaskActionConfigCommand {
  action: 'Command';
  exec: string; // Executable path
  args?: string[]; // Arguments for the command
  detach?: boolean; // Default: false
}

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md#custom-1
interface TaskActionConfigCustom {
  action: 'Custom';
  custom_action: string; // Custom action name
  custom_action_param?: object; // Default: {}
  target?: true | string | number[]; // Default: true
  target_offset?: number[]; // Default: [0, 0, 0, 0]
}

type TaskActionConfig =
  | TaskActionConfigDoNothing
  | TaskActionConfigClick
  | TaskActionConfigLongPress
  | TaskActionConfigSwipe
  | TaskActionConfigMultiSwipe
  | TaskActionConfigKey
  | TaskActionConfigInputText
  | TaskActionConfigStartApp
  | TaskActionConfigStopApp
  | TaskActionConfigStopTask
  | TaskActionConfigCommand
  | TaskActionConfigCustom;

// https://github.com/MaaXYZ/MaaFramework/blob/main/docs/zh_cn/3.1-%E4%BB%BB%E5%8A%A1%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%8D%8F%E8%AE%AE.md
export interface Pipeline {
  [key: string]: TaskCommonConfig & TaskRecognitionConfig & TaskActionConfig;
}

export interface PipelineOverrideAction {
  [key: string]: TaskCommonConfig & TaskActionConfig;
}

export interface PipelineOverrideRecognition {
  [key: string]: TaskCommonConfig & TaskRecognitionConfig;
}
