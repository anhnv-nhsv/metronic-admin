import { App } from "vue";
import VueAxios from "vue-axios";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class RequestStatisticsService {
  public static vueInstance: App;

  public static init(app: App<Element>) {
    RequestStatisticsService.vueInstance = app;
    RequestStatisticsService.vueInstance.use(VueAxios, axios);
    RequestStatisticsService.vueInstance.axios.defaults.baseURL =
      process.env.VUE_APP_API_URL;
  }

  public static getRequestStatistics(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    console.log(RequestStatisticsService.vueInstance.axios)
    return RequestStatisticsService.vueInstance.axios.get(
      `${resource}`,
      params
    ).catch((error) => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  }
}

export default RequestStatisticsService;
