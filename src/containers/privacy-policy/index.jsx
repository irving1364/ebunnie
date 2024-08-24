import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";

const PrivacyPolicyArea = ({ className, space }) => (
    <div
        className={clsx(
            "rn-privacy-policy-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row mb_dec--50">
                <div className="offset-lg-2 col-lg-8 ">
                    <div className="privacy-wrapper">
                        
                        <h4 className="text-center">Pol&iacute;tica de Privacidad</h4>

                        <br />
                        <br />
                        <h5>Manejo de su Informaci&oacute;n Personal</h5>
                        <p>Nos comprometemos a mantener la seguridad y confidencialidad de sus datos personales en todas nuestras operaciones.</p>
                        <h5>Actualizaci&oacute;n de la Pol&iacute;tica de Privacidad</h5>
                        <p>Podemos actualizar esta pol&iacute;tica peri&oacute;dicamente para cumplir con la legislaci&oacute;n de protecci&oacute;n de datos en Bolivia. Cualquier cambio significativo ser&aacute; comunicado actualizando el enlace en el pie de p&aacute;gina de nuestro sitio web.</p>
                        <h5>Recomendaciones</h5>
                        <p>Le recomendamos leer esta pol&iacute;tica antes de usar el sitio web y revisar regularmente para conocer la versi&oacute;n m&aacute;s reciente.</p>
                        <h5>Cumplimiento Normativo</h5>
                        <p>Seguimos las directrices de la Decisi&oacute;n 897 de la Comunidad Andina de Naciones y la normativa boliviana sobre protecci&oacute;n de datos. Todos los responsables de tratamiento de datos en ubunnies.com est&aacute;n comprometidos con la confidencialidad, conforme al art&iacute;culo 17 de la Decisi&oacute;n 897.</p>
                        <h5>Procesamiento de Datos Personales</h5>
                        <h5><strong>Informaci&oacute;n Personal Recopilada</strong></h5>
                        <ul>
                            <li><strong>Datos de contacto:</strong> Nombre, apellidos, tel&eacute;fono y correo electr&oacute;nico.</li>
                            <li><strong>Datos de Pago:</strong> Informaci&oacute;n sobre compras y detalles de pago.</li>
                            <li><strong>Otros Datos Personales:</strong> G&eacute;nero, edad, fotograf&iacute;as, etc.</li>
                            <li><strong>Categor&iacute;as Especiales:</strong> Estilo de vida y comportamiento sexual.</li>
                            <li><strong>Uso del Sitio Web:</strong> Direcci&oacute;n IP y datos obtenidos mediante cookies.</li>
                            <li><strong>IP del Dispositivo:</strong> Solo compartimos en caso de investigaci&oacute;n policial.</li>
                        </ul>
                        <p>Recopilamos esta informaci&oacute;n con su consentimiento expl&iacute;cito y usted controla los datos que comparte.</p>
                        <h5>C&oacute;mo Recopilamos Sus Datos</h5>
                        <ul>
                            <li><strong>Registro en el Sitio:</strong> Para acceder a todas las funciones.</li>
                            <li><strong>Publicaci&oacute;n o Respuesta a Anuncios:</strong> Si publica o responde a anuncios.</li>
                        </ul>
                        <p>Si proporciona datos en nombre de otra persona, aseg&uacute;rese de que esta haya le&iacute;do y consentido nuestra pol&iacute;tica.</p>
                        <p>Mantenga sus datos actualizados y notif&iacute;quenos cualquier cambio. No nos hacemos responsables del manejo de datos entre usuarios contactados a trav&eacute;s del sitio web.</p>
                        <h5>Uso de Cookies</h5>
                        <p>Recopilamos informaci&oacute;n durante su visita para an&aacute;lisis y gesti&oacute;n del sitio. Utilizamos &quot;cookies&quot; para rastrear su navegaci&oacute;n y mejorar nuestros servicios. Las cookies pueden ser de sesi&oacute;n o permanentes. S&oacute;lo usamos cookies de terceros con fines estad&iacute;sticos.</p>
                        <p>Puede aceptar o rechazar cookies cambiando la configuraci&oacute;n de su navegador, pero esto puede afectar la funcionalidad del sitio web.</p>
                        <h5>Prop&oacute;sitos del Uso de sus Datos</h5>
                        <ul>
                            <li><strong>Acceso y Navegaci&oacute;n:</strong> Permitir acceso y registro en el sitio web.</li>
                            <li><strong>Publicaci&oacute;n y Respuesta a Anuncios: </strong>Procesamiento de datos de contacto para anuncios.</li>
                            <li><strong>Pedidos y Actividades Relacionadas:</strong> Gesti&oacute;n de pedidos y datos de pago.</li>
                            <li><strong>Marketing y Promociones:</strong> Comunicaci&oacute;n de promociones con su consentimiento.</li>
                            <li><strong>Estudios de Mercado:</strong> Mejorar servicios basados en la satisfacci&oacute;n del cliente.</li>
                            <li><strong>Defensa de Derechos Legales:</strong> Defensa de derechos en procedimientos legales.</li>
                            <li><strong>Cumplimiento Legal: </strong>Cumplir con regulaciones y solicitudes legales.</li>
                        </ul>
                        <p>Nos comprometemos a utilizar sus datos de manera responsable y conforme a la ley, garantizando su privacidad en todo momento.</p>
                       
                        <h5>Seguridad de sus Datos Personales</h5>
                        <p>Implementamos diversas medidas de seguridad para proteger sus datos personales. Estos datos se almacenan en servidores seguros, accesibles s&oacute;lo seg&uacute;n nuestros est&aacute;ndares de seguridad y pol&iacute;ticas.</p>
                        <h5>Per&iacute;odo de Retenci&oacute;n de Datos Personales</h5>
                        <p>Retenemos sus datos personales s&oacute;lo el tiempo necesario para los fines para los que fueron recopilados:</p>
                        <ul>
                            <li><strong>Acceso y Navegaci&oacute;n en el Sitio:</strong> M&aacute;ximo de 1 a&ntilde;o desde el &uacute;ltimo acceso.</li>
                            <li><strong>Publicaci&oacute;n y Respuesta a Anuncios:</strong> M&aacute;ximo de 1 a&ntilde;o desde la publicaci&oacute;n.</li>
                            <li><strong>Procesamiento de Pedidos:</strong> Mientras el contrato est&eacute; vigente, y hasta 5 a&ntilde;os despu&eacute;s.</li>
                            <li><strong>Marketing y Promociones:</strong> M&aacute;ximo de 2 a&ntilde;os desde la recopilaci&oacute;n, salvo retiro del consentimiento.</li>
                            <li><strong>Estudios de Mercado:</strong> M&aacute;ximo de 2 a&ntilde;os desde la recopilaci&oacute;n.</li>
                            <li><strong>Defensa de Derechos Legales:</strong> Hasta cumplir dicho prop&oacute;sito.</li>
                            <li><strong>Cumplimiento Legal:</strong> Mientras sea necesario.</li>
                        </ul>
                        <p>Tras estos per&iacute;odos, los datos ser&aacute;n anonimizados o eliminados de forma segura.</p>
                       
                        <h5>Con Qui&eacute;n Compartimos sus Datos Personales</h5>
                        <p>Sus datos est&aacute;n disponibles solo para empleados autorizados y proveedores externos cuando sea necesario, como servicios t&eacute;cnicos y pasarelas de pago. No compartimos sus datos con terceros salvo por obligaci&oacute;n legal.</p>
                        <h5>Datos de Contacto</h5>
                        <ul>
                            <li>Correo Electr&oacute;nico: <a data-fr-linked="true" href="mailto:contact@ubunnies.com">contact@ubunnies.com</a></li>
                        </ul>
                        <h5>Sus derechos de protecci&oacute;n de datos personales y el derecho a presentar quejas</h5>
                        <p>Usted tiene los siguientes derechos:</p>
                        <ul>
                            <li>1. Acceder a sus datos.</li>
                            <li>2. Obtener una copia de sus datos (portabilidad). Rectificar y actualizar sus datos.</li>
                            <li>3. Derecho a la eliminaci&oacute;n de datos personales para los cuales la Compa&ntilde;&iacute;a ya no tenga un fundamento legal de procesamiento.</li>
                            <li>4. Derecho a retirar (revocar) su consentimiento cuando el procesamiento se base en el consentimiento.</li>
                            <li>5. Derecho a solicitar la limitaci&oacute;n del procesamiento o la circulaci&oacute;n de sus datos personales, en la medida permitida por la legislaci&oacute;n vigente.</li>
                        </ul>
                        <p>Puede oponerse al procesamiento basado en nuestro inter&eacute;s leg&iacute;timo. Para ejercer estos derechos, contacte a: <a data-fr-linked="true" href="mailto:support@ubunnies.com">support@ubunnies.com</a></p>
                        <p>Responderemos en un plazo de un mes.</p>
                        <p>Si desea, puede presentar una queja ante la Autoridad de Telecomunicaciones y Transportes de Bolivia o ante los tribunales.</p>
                        <h5>C&oacute;mo Eliminar sus Datos Personales</h5>
                        <p>Al desactivar su cuenta en ubunnies.com, eliminaremos su informaci&oacute;n p&uacute;blica. Internamente, conservaremos sus datos durante 6 meses en caso de investigaci&oacute;n policial, tras lo cual se eliminar&aacute;n autom&aacute;ticamente. Puede solicitar la desactivaci&oacute;n y eliminaci&oacute;n de su cuenta mediante el formulario de soporte o escribiendo a; <a data-fr-linked="true" href="mailto:support@ubunnies.com">support@ubunnies.com</a>.</p>
                        <h5>Agosto 2024</h5>
                    
                    


                    </div>
                </div>
            </div>
            <div className="row mt--50">
                <div className="offset-lg-2 col-lg-8">
                   
                </div>
            </div>
        </div>
    </div>
);

PrivacyPolicyArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
PrivacyPolicyArea.defaultProps = {
    space: 1,
};

export default PrivacyPolicyArea;
