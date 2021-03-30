import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@core/environment';

/**
 * Prepend an object's properties containing `Src` with the environment API URL
 */
export function preprendProperties<Data, Key extends keyof Data>(data: Data, ...keys: Key[]): Data {

  for (const key of keys) {

    const propertyValue = data[key];

    if (typeof propertyValue === 'string') {

      data = {
        ...data,
        [key]: `${environment.apiUrl}${propertyValue}`
      };

    }

  }

  return data;

}

/**
 * RxJS operator to prepend an object's or an array of objects' properties containing `Src` with the environment API URL
 */
export function prependEnvironmentItem<Data, Key extends keyof Data>(...keys: Key[]): OperatorFunction<Data, Data> {

  return map((data) => {

    return preprendProperties(data, ...keys);

  });

}

export function prependEnvironmentList<Data, Key extends keyof Data>(...keys: Key[]): OperatorFunction<Data[], Data[]> {

  return map((data) => {

    return data.map((item) => preprendProperties(item, ...keys));

  });

}
