import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';

import { FlyboxRouterPlatform } from './platform';

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class FlyboxRouterPlatformAccessory {
  private service: Service;

  constructor(
    private readonly platform: FlyboxRouterPlatform,
    private readonly accessory: PlatformAccessory,
  ) {

    // set accessory information
    this.service = this.accessory.getService(this.platform.Service.WiFiRouter)!;

    this.service.setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer');
    this.service.setCharacteristic(this.platform.Characteristic.Model, 'Default-Model');
    this.service.setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.ConfiguredName)
      .onGet(this.getConfiguredName.bind(this))
      .onSet(this.setConfiguredName.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.ManagedNetworkEnable)
      .onGet(this.getManagedNetworkEnable.bind(this))
      .onSet(this.setManagedNetworkEnable.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.RouterStatus)
      .onGet(this.getRouterStatus.bind(this));

    /**
     * Creating multiple services of the same type.
     *
     * To avoid "Cannot add a Service with the same UUID another Service without also defining a unique 'subtype' property." error,
     * when creating multiple services of the same type, you need to use the following syntax to specify a name and subtype id:
     * this.accessory.getService('NAME') || this.accessory.addService(this.platform.Service.Lightbulb, 'NAME', 'USER_DEFINED_SUBTYPE_ID');
     *
     * The USER_DEFINED_SUBTYPE must be unique to the platform accessory (if you platform exposes multiple accessories, each accessory
     * can use the same sub type id.)
     *
    // Example: add two "motion sensor" services to the accessory
    const motionSensorOneService = this.accessory.getService('Motion Sensor One Name') ||
      this.accessory.addService(this.platform.Service.MotionSensor, 'Motion Sensor One Name', 'YourUniqueIdentifier-1');

    const motionSensorTwoService = this.accessory.getService('Motion Sensor Two Name') ||
      this.accessory.addService(this.platform.Service.MotionSensor, 'Motion Sensor Two Name', 'YourUniqueIdentifier-2');

    /**
     * Updating characteristics values asynchronously.
     *
     * Example showing how to update the state of a Characteristic asynchronously instead
     * of using the `on('get')` handlers.
     * Here we change update the motion sensor trigger states on and off every 10 seconds
     * the `updateCharacteristic` method.
     *
     *
    let motionDetected = false;
    setInterval(() => {
      // EXAMPLE - inverse the trigger
      motionDetected = !motionDetected;

      // push the new value to HomeKit
      motionSensorOneService.updateCharacteristic(this.platform.Characteristic.MotionDetected, motionDetected);
      motionSensorTwoService.updateCharacteristic(this.platform.Characteristic.MotionDetected, !motionDetected);

      this.platform.log.debug('Triggering motionSensorOneService:', motionDetected);
      this.platform.log.debug('Triggering motionSensorTwoService:', !motionDetected);
    }, 10000);
     */
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, turning on a Light bulb.
   */
  async setConfiguredName(value: CharacteristicValue) {
    this.platform.log.debug('Set Characteristic On ->', value);
  }

  async setManagedNetworkEnable(value: CharacteristicValue) {
    this.platform.log.debug('Set Characteristic On ->', value);
  }

  /**
   * Handle the "GET" requests from HomeKit
   * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a Light bulb is on.
   *
   * GET requests should return as fast as possbile. A long delay here will result in
   * HomeKit being unresponsive and a bad user experience in general.
   *
   * If your device takes time to respond you should update the status of your device
   * asynchronously instead using the `updateCharacteristic` method instead.
   *
   * @example
   * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
   *
   * If you need to return an error to show the device as "Not Responding" in the Home app:
   * @example
   * throw new this.platform.api.hap.HapStatusError(this.platform.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE);
   */
  async getConfiguredName(): Promise<CharacteristicValue> {
    this.platform.log.debug('Get Characteristic On ->', 'isOn');
    return 'Prueba cN';
  }

  async getManagedNetworkEnable(): Promise<CharacteristicValue> {
    this.platform.log.debug('Get Characteristic On ->', 'isOn');
    return 'Prueba cN';
  }

  async getRouterStatus(): Promise<CharacteristicValue> {
    this.platform.log.debug('Get Characteristic On ->', 'isOn');
    return 'Prueba cN';
  }
}
