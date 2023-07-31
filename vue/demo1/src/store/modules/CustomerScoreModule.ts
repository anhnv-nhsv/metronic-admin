import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

@Module
export default class CustomerScoreModule extends VuexModule {

  customersScoreResp = [];

  get getCustomersScore() {
    return JSON.parse(JSON.stringify(this.customersScoreResp));
  }

  @Mutation
  [Mutations.GET_CUSTOMERS_SCORE_MUTATION](response) {
    this.customersScoreResp = response;
  }

  @Action
  [Actions.GET_CUSTOMERS_SCORE_ACTION](params) {
    return new Promise<void>((resolve, reject) => {
      ApiService.query("/account-info", params)
        .then((res) => {
          this.context.commit(Mutations.GET_REQUEST_STATISTICS_MUTATION, res.data);
          resolve();
        })
        .catch((err) => {
          this.context.commit(Mutations.SET_ERROR, err);
          reject();
        });
    });
  }
}