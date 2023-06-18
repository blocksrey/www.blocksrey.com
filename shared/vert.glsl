let vertShaderString = `#version 300 es

precision lowp float;

in vec3 vpos;
in vec3 vcol;

out vec3 fcol;

uniform vec3 camp;
uniform vec4 camo;
//uniform vec3 proj;
uniform float rati;

vec3 qrot(vec4 q, vec3 v) { return v + 2.0f*cross(cross(v, q.xyz) + q.w*v, q.xyz); } // forward
vec3 qtor(vec4 q, vec3 v) { return v + 2.0f*cross(q.xyz, cross(q.xyz, v) + q.w*v); } // inverse

void main() {
	vec3 tran = qtor(camo, vpos - camp);
	if (tran.z > 0.0f)
		tran = vec3(tran.xy/tran.z, 0.001f*tran.z);
	else
		tran.z = 2.0f;

	gl_Position = vec4(rati, 1.0f, 1.0f, 1.0f)*vec4(tran, 1.0f);

	fcol = vcol;
}
`