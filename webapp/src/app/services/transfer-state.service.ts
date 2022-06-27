import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TransferStateService {

  isServer: boolean = isPlatformServer(this.platformId);
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private transferState: TransferState,
  ) {}

  public async transferData<T>(dataKey: string, getterFn: Function): Promise<T> {
    if (this.isServer) {
      console.debug('[tss] Server');
      const results = await getterFn();
      this.saveState<T>(dataKey, results);
      return results;
    } else {
      if (this.hasState<T>(dataKey)) {
        console.debug('[tss] Server');
        return this.getState<T>(dataKey);
      } else {
        console.debug('[tss] Frontend');
        return await getterFn();
      }
    }
  }

  private saveState<T>(key: string, data: any): void {
    this.transferState.set<T>(makeStateKey(key), data);
  }

  private getState<T>(key: string, defaultValue: any = []): T {
    const state = this.transferState.get<T>(makeStateKey(key), defaultValue);
    this.transferState.remove(makeStateKey(key));
    return state;
  }

  private hasState<T>(key: string) {
    return this.transferState.hasKey<T>(makeStateKey(key));
  }

}
